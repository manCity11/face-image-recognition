import React from 'react';

import { FaceRecognitionService } from 'commons/face-recognition/face-recognition.service';

import './image-input.scss';

export class FileSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  onChange($file) {
    const file = _.get($file.target, 'files[0]');

    FaceRecognitionService.loadModels(file)
      .then(({
        image,
        canvas,
        resizedDetections,
        faceMatcher,
      } = {}) => {
        const imageContainer = document.getElementById('image__container');
        imageContainer.appendChild(image);
        imageContainer.appendChild(canvas);

        FaceRecognitionService.drawFaceBoxes({ resizedDetections, faceMatcher }, canvas);
      })
      .catch((error) => console.log('error', error));
  }

  render() {
    return (
      <React.Fragment>
        <input type="file" onChange={this.onChange} />
        <div className="container" id="image__container" />
      </React.Fragment>
    );
  }
}
