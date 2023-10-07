import React, { useState } from 'react';

const EditImage = ({ BaseUrl, authToken, authTokenType, navigate }) => {
  
  const [ profilePic, setProfilePic ] = useState(null);
  const [error, setError] = useState('')
  
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };


  const handleUpload = (e) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append('image', profilePic);

    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Authorization: authTokenType + ' ' + authToken,
      }),
      body: formData,
    }

    fetch(BaseUrl + 'user/image', requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        navigate('/profile');
      })
      .catch((err) => {
        document.getElementById('profilePicture').value = null;
        setError('Error uploading your file, try again.')
      });
  }

  return (
    <div className='signin-form'>
      <form>
        <h4>Change your profile picture.</h4>
        <div className='orm-floating'>
          <label
            htmlFor='profile_picture'
            className='form-label'
          ></label>
          <input
            className='form-control'
            type='file'
            id='profilePicture'
            onChange={handleFileChange}
            required
          />
        </div>

        {error && (
          <div>
            <p className='text-danger'>{error}</p>
          </div>
        )}

        <button
          className='btn btn-primary w-100 py-2'
          type='submit'
          onClick={handleUpload}
        >
          Upload
        </button>
      </form>
    </div>
  );
      
};

export default EditImage;
