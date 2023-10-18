'use client';

import ProfileComponent from '@components/Profile/Profile';
import { IPrompt } from '@models/prompt';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post: IPrompt) => {
    console.log('handleEdit post', post);
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: IPrompt) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ProfileComponent
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
