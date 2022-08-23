import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addImgSpot } from '../../store/singleSpotReducer';

import { createSpot } from '../../store/spotsReducer';

const AddImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()
    const [url, setUrl] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const updateUrl = (e) => setUrl(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          url,
          previewImage,
        };

        console.log('INSIDE ADD-IMG-SPOT FORM SUBMIT')

        let createdImage;
          createdImage = await dispatch(addImgSpot(spotId, payload));
        // if (createdSpot) {
        //   history.push(`/spots/${createdSpot.id}`);
      };




    return (
        <section className='font-family'>
            <div className='flex-box flex-direction-column'>
                    <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Add Image to Spot Based on Id</h1>
                    </div>
                    <div>
                        URL:
                        <input
                            type="text"
                            placeholder="Image URL"
                            required
                            value={url}
                            onChange={updateUrl} />
                    </div>
                    <div>
                        Preview Image: 
                        <input
                            type="boolean"
                            // dropdown?
                            placeholder="True / False"
                            required
                            value={previewImage}
                            onChange={updatePreviewImage} />
                    </div>
                    <button type="submit">Add Image</button>
                </form>
            </div>
        </section>
    );
};

export default AddImage;
