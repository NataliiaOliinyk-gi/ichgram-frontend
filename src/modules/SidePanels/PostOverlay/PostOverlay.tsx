import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AxiosError } from "axios";

import Loader from "../../../shared/components/Loader/Loader";
import Error from "../../../shared/components/Error/Error";
import ViewPostModal from "../../Modals/ViewPostModal/ViewPostModal";

import { getPostByIdApi } from "../../../shared/api/post-api";

import type { IPost } from "../../../typescript/interfaces";

const PostOverlay = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostByIdApi(id);
        setPost(data);
      } catch (err) {
        const message =
          (err as AxiosError<{ message: string }>).response?.data?.message ||
          (err as AxiosError).message ||
          "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader loading={true} />;
  if (error) return <Error>{error}</Error>;
  if (!post) return null;

   return <ViewPostModal post={post} />;
};

export default PostOverlay;
