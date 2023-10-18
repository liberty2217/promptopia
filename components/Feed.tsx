'use client';

import PromptCard from '@components/PromptCard';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { IPrompt } from '@models/prompt';

type PromptCardListProps = {
  data: IPrompt[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className='mt-16 prompt_layout'>
    {data.map((post) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

function Feed() {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<IPrompt[]>([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  };

  const [searchedResults, setSearchedResults] = useState<IPrompt[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = debounce((searchtext: string) => {
    const regex = new RegExp(searchtext, 'i');
    const results = posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );

    setSearchedResults(results);
  }, 1500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    filterPrompts(e.target.value);
  };

  const onTagClick = (tag: string) => {
    setSearchText(tag);
    filterPrompts(tag);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText.length > 0 ? (
        <PromptCardList data={searchedResults} handleTagClick={onTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={onTagClick} />
      )}
    </section>
  );
}

export default Feed;
