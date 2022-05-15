import React from "react";

import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  IS_LIKE,
  REMOVE_LIKE,
  COUNT_LIKES,
} from "../../../../../../gql/like";

export default function CounterLikes(props) {
  const { post } = props;

  const [addLike] = useMutation(ADD_LIKE);
  const [removeLike] = useMutation(REMOVE_LIKE);

  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: { idPublication: post.id },
  });

  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKES, {
    variables: { idPublication: post.id },
  });

  const onAddLike = async () => {
    try {
      await addLike({
        variables: {
          idPublication: post.id,
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
          idPublication: post.id,
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
    <div
      className={isLike ? "likes active" : "likes"}
      onClick={isLike ? onRemoveLike : onAddLike}
    >
      <span>
        <i className="fa-regular fa-thumbs-up"></i>
        <span>
          {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </span>
      </span>
    </div>
  );
}
