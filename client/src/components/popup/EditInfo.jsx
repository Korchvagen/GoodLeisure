import React, { useState, useRef, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatarIcon from '../../assets/icons/avatar.png';
import "../../styles/popup/popup-content.scss"
import { fetchEditProfile, selectCity, selectImage, selectMessage, selectName } from '../../redux/slices/profile';

export function EditInfo({ setActive }) {
  const dispatch = useDispatch();
  const imageError = useSelector(selectMessage);
  const image = useSelector(selectImage);
  const name = useSelector(selectName);
  const city = useSelector(selectCity);
  const imgRef = useRef(null);
  const [inputImageName, setInputImageName] = useState("");
  const [inputImageType, setInputImageType] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    if (image) {
      setInputImage(image);
      setInputName(name);
      setInputCity(city);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if(file){
      setInputImage(file);
      setInputImageName(file.name);
      setInputImageType(file.type);
      
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result;
        
        imgRef.current.src = imageUrl;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleCityChange = (e) => {
    setInputCity(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();

    formData.append('image', inputImage);
    formData.append('name', inputName);
    formData.append('city', inputCity);
    formData.append('type', inputImageType);

    const data = await dispatch(fetchEditProfile(formData));

    if(data.payload?.profile){
      setActive(false);
    }
  };

  return (
    <div className='popup-content'>
      <form className='container__form' onSubmit={onSubmit}>
        <div className='image-select-container'>
          <div className='image-frame'>
            <img ref={imgRef} src={inputImage ? `data:image/png;base64,${inputImage}` : avatarIcon} alt="Chosen Image" className="selected-image"/>
          </div>
          <label className='selected-image__label'>
            <input type="file" className='selected-image__input' onChange={handleFileChange} />
            <span>{inputImageName ? inputImageName : "Загрузить фотографию"}</span>
          </label>
          { imageError && <p id='error-image' className='error-message'>{imageError}</p> }
        </div>
        <label htmlFor="name">Имя</label>
        <input type="text" id='name' onChange={handleNameChange} value={inputName}/>
        <label htmlFor="city">Город</label>
        <input type="text" id='city' onChange={handleCityChange} value={inputCity}/>
        <button className='form__button' type="submit">Сохранить</button>
      </form>
    </div>
  );
}