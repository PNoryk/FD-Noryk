import "./styles.scss";

import classNames from "classnames";

import { ReactComponent as BookmarkIcon } from "@/assets/icons/Bookmark.svg";
import noImageSrc from "@/assets/no-image.png";

export const Card = ({ movie, showFavorite = false, isFavorite }) => {
  let { poster, title } = movie;
  let hasImage = poster.startsWith("http");
  return (
    <div className={classNames("card", { "card--favorite": isFavorite })}>
      <img
        className={classNames("card__image", {
          "card__image--no-image": !hasImage,
        })}
        src={hasImage ? movie.poster : noImageSrc}
        alt={title + " image"}
        loading="lazy"
      />
      <h2 className="card__title">{title}</h2>
      {showFavorite && (
        <button className="card__bookmark">
          <span className="visually-hidden">add to favorites</span>
          <BookmarkIcon />
        </button>
      )}
    </div>
  );
};
