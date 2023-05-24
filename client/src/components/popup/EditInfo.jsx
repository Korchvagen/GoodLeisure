import React, { useState, useRef  } from 'react';
import { useDispatch } from 'react-redux';
import avatarIcon from '../../assets/icons/avatar.png';
import "../../styles/popup/popup-content.scss"
import { fetchEditProfile } from '../../redux/slices/profile';

export function EditInfo() {
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const [selecteImageName, setSelectedImageName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if(file){
      setSelectedImage(file);
      setSelectedImageName(file.name)

      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result;
        
        imgRef.current.src = imageUrl;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();

    formData.append('image', selectedImage);
    formData.append('name', name);
    formData.append('city', city);
    console.log(formData);

    const data = await dispatch(fetchEditProfile(formData));

    console.log(data);
  };

  return (
    <div className='popup-content'>
      <form className='container__form' onSubmit={onSubmit}>
        <div className='image-select-container'>
          <div className='image-frame'>
            <img ref={imgRef} src={selectedImage ? selectedImage : avatarIcon} alt="Chosen Image" className="selected-image"/>
          </div>
          <label className='selected-image__label'>
            <input type="file" className='selected-image__input' onChange={handleFileChange} />
            <span>{selecteImageName ? selecteImageName : "Загрузить фотографию"}</span>
          </label>
        </div>
        <label htmlFor="name">Имя</label>
        <input type="text" id='name' onChange={handleNameChange} value={name}/>
        <label htmlFor="city">Город</label>
        <input type="text" id='city' onChange={handleCityChange} value={city}/>
        <button className='form__button' type="submit">Сохранить</button>
      </form>
    </div>
  );
}