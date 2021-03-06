import React from 'react';

import { ReactComponent as LikeIcon } from '../../assets/images/like.svg';
import { ReactComponent as CartIcon } from '../../assets/images/shoppingBag1.svg';
import { ReactComponent as DotIcon } from '../../assets/images/dot.svg';

import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

import SearchInput from '../../components/UI/searchInput/SearchInput';
import { getInfoSectionRequest, getLogoRequest } from '../../api/storeService';

const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [dotNotificationFavorite, setDotNotificationFavorite] =
    React.useState(Boolean);
  const [dotNotificationCart, setDotNotificationCart] = React.useState(Boolean);
  const [logo, setLogo] = React.useState();
  const [telNumber, setTelNumber] = React.useState();

  const getLogo = async () => {
    try {
      const response = await getLogoRequest();
      setLogo(response.data.headerlogo);
    } catch (error) {
      console.log(error);
    }
  };

  const getTelNumber = async () => {
    try {
      const response = await getInfoSectionRequest();
      setTelNumber(response.data.telphones.mainPhone);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTelNumber();
    getLogo();
    setDotNotificationFavorite(true);
    setDotNotificationCart(true);
  }, []);

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const iconClickHandler = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div>
          <ul className={click ? 'nav-ul' : 'nav-menu-mobile'}>
            <li className="nav-li">
              <Link to="/aboutUs" className="nav-links">
                О нас
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/collections" className="nav-links">
                Коллекции
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/news" className="nav-links">
                Новости
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-telphone">Тел: </span>
          <a className="tel-number" href="tel:+996000000000">
            {telNumber}
          </a>
        </div>
      </div>
      <div className="navbar-bottom">
        <div>
          <img
            role="presentation"
            src={logo}
            onClick={iconClickHandler}
            className="icon-logo"
            alt="logo"
          />
        </div>
        <div className="castom-input">
          <SearchInput
            inputValue={inputValue}
            inputChangeHandler={inputChangeHandler}
          />
        </div>
        <div className="favorit-cart">
          <Link to="/favorites" className="cart">
            <div className="divOfImages">
              <LikeIcon
                className="iconStyle"
                onClick={() => {
                  setDotNotificationFavorite((prev) => !prev);
                }}
              />
              {dotNotificationFavorite && <DotIcon className="dotIcon" />}
            </div>
            Избранное
          </Link>
          <div className="div-of-button">
            <Link to="/cart" className="cart">
              <div className="divOfImages">
                <CartIcon className="iconStyle" />
                {dotNotificationCart && <DotIcon className="dotIcon" />}
              </div>
              Корзина
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
