import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'This AI Brain will detect faces in your pictures. Please input your link to get it a try'}
            </p>
            <div className='center'>
                <div className="form center br3 shadow-5 pa4">
                    <input 
                        className='f4 pa2 w-70' type='tex'
                        onChange={onInputChange}
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib black bg-light-yellow'
                        onClick={onButtonSubmit}
                    >Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;