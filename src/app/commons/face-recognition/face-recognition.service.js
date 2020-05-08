import * as faceapi from 'face-api.js';

import { ImageDisplay } from './models/image-display.model';
import { FACE_FOLDERS, MATCHED_PERCENTAGE } from './face-recognition.constants';

const FaceRecognitionServiceMethod = () => ({
  loadModels(file) {
    return Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri('/recognition-models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/recognition-models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/recognition-models'),
    ])
      .then(() => faceapi.bufferToImage(file))
      .then((image) => this.loadLabeledImages(FACE_FOLDERS).then((labeledFaceDescriptors) => ({
        image,
        labeledFaceDescriptors,
      })))
      .then(({ image, labeledFaceDescriptors } = {}) => {
        const canvas = faceapi.createCanvasFromMedia(image);
        const detections = faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, MATCHED_PERCENTAGE);
        faceapi.matchDimensions(canvas, new ImageDisplay(image));
        return faceapi.resizeResults(detections, new ImageDisplay(image))
          .then((resizedDetections) => ({
            image,
            canvas,
            resizedDetections,
            faceMatcher,
          }));
      });
  },

  drawFaceBoxes({ resizedDetections = [], faceMatcher }, canvas) {
    const results = _.map(resizedDetections, ({ descriptor }) => faceMatcher.findBestMatch(descriptor));
    _.each(results, (result, index) => {
      const box = _.get(resizedDetections, `[${index}].detection.box`);
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.label });

      drawBox.draw(canvas);
    });
  },

  loadCharacterFaces({ folderName = '', displayedName = '' } = {}) {
    const promises = _.map([1, 2], (pictureNumber) => faceapi.fetchImage(`/labeled-images/${folderName}/${pictureNumber}.jpg`));
    return Promise.all(promises)
      .then((faces) => {
        const detectionPromises = _.map(faces, (face) => faceapi.detectSingleFace(face).withFaceLandmarks().withFaceDescriptor());
        return Promise.all(detectionPromises).then((descriptors) => _.map(descriptors, ({ descriptor } = {}) => descriptor));
      })
      .then((descriptions) => new faceapi.LabeledFaceDescriptors(displayedName, descriptions));
  },

  loadLabeledImages(faceFolders = []) {
    const promises = _.map(faceFolders, (faceFolder) => this.loadCharacterFaces(faceFolder));
    return Promise.all(promises);
  },
});

export const FaceRecognitionService = new FaceRecognitionServiceMethod();
