import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import FavoritesCharactersElements from "../components/FavoritesCharactersElements";
import FavoritesComicsElements from "../components/FavoritesComicsElements";

import Cookies from "js-cookie";

const Favorites = () => {
  const history = useHistory();

  const [cookiesLoadup, setCookiesLoadup] = useState(true);
  const [cookiesCharacter, setCookiesCharacter] = useState("");
  const [cookiesComics, setCookiesComics] = useState("");

  // Get favorite from cookies
  useEffect(() => {
    // Favorite Characters
    let userCookiesCharacter = Cookies.get("marvelFavoriteCharacters");
    let userCookiesArrayCharacter;
    if (userCookiesCharacter) {
      userCookiesCharacter = userCookiesCharacter.substring(
        0,
        userCookiesCharacter.lastIndexOf("&")
      );
      userCookiesArrayCharacter = userCookiesCharacter.split("&");
    }
    setCookiesCharacter(userCookiesArrayCharacter);
    // Favorite Comics
    let userCookiesComics = Cookies.get("marvelFavoriteComics");
    let userCookiesArrayComics;
    if (userCookiesComics) {
      userCookiesComics = userCookiesComics.substring(
        0,
        userCookiesComics.lastIndexOf("&")
      );
      userCookiesArrayComics = userCookiesComics.split("&");
    }
    setCookiesComics(userCookiesArrayComics);
    setCookiesLoadup(false);
  }, []);

  // Remove all favorites
  const removeFavorites = () => {
    Cookies.remove("marvelFavoriteComics");
    Cookies.remove("marvelFavoriteCharacters");
    setCookiesCharacter("");
    setCookiesComics("");
    history.push("/");
  };

  return (
    !cookiesLoadup && (
      <div className="container">
        <div className="favorites-title">
          <h2>Favorites characters</h2>
          <button onClick={() => removeFavorites()}>
            <h3>Remove all Favorites</h3>
          </button>
        </div>
        <section className="favorites-characters">
          {cookiesCharacter &&
            cookiesCharacter.map((e, index) => {
              return (
                <FavoritesCharactersElements key={index} index={index} id={e} />
              );
            })}
        </section>
        <h2>Favorites comics</h2>
        <section className="favorites-comics">
          {cookiesComics &&
            cookiesComics.map((e, index) => {
              return (
                <FavoritesComicsElements key={index} index={index} id={e} />
              );
            })}
        </section>
      </div>
    )
  );
};

export default Favorites;
