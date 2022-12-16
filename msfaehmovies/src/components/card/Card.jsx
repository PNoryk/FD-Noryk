import "./styles.scss";

import classNames from "classnames";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

import { ReactComponent as BookmarkIcon } from "@/assets/icons/Bookmark.svg";
import noImageSrc from "@/assets/no-image.png";
import { auth, db } from "@/services/firebase.js";

export const Card = ({ movie, showFavorite = false, isFavorite }) => {
  let { poster, title } = movie;
  let hasImage = poster?.startsWith("http");
  const [user] = useAuthState(auth);

  let addToFavorite = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      favorite: arrayUnion(movie.imdbId),
    });
    toast.success(
      <span>
        <b>{title}</b> was successfully added to favorites👍
      </span>
    );
  };

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
        <button
          type="button"
          className="card__bookmark"
          onClick={addToFavorite}
        >
          <span className="visually-hidden">add to favorites</span>
          <BookmarkIcon />
        </button>
      )}
    </div>
  );
};
