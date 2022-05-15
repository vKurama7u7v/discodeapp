import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  IS_LIKE,
  REMOVE_LIKE,
  COUNT_LIKES,
} from "../../../../../gql/like";

export default function Likes(props) {
  const { likes, id } = props;

  const [addLike] = useMutation(ADD_LIKE);
  const [removeLike] = useMutation(REMOVE_LIKE);

  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: { idPublication: id },
  });

  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKES, {
    variables: { idPublication: id },
  });

  const onAddLike = async () => {
    try {
      await addLike({
        variables: {
          idPublication: id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveLike = async () => {
    try {
      await removeLike({
        variables: {
          idPublication: id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || loadingCount) return null;
  const { isLike } = data;
  const { countLikes } = dataCount;

  return (
    <>
      <div
        className={isLike ? "likes active" : "likes"}
        onClick={isLike ? onRemoveLike : onAddLike}
      >
        <i className="fa-regular fa-thumbs-up"></i>
        <span>
          {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </span>
      </div>
    </>
  );
}
