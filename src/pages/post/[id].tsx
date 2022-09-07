import { PostWithContent } from '@interfaces/post';
import { get } from '@utils/fetch';
import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends PostWithContent {}

const PostPage: NextPage<Props> = ({ title, date, tags, content }) => {
  return (
    <Wrapper>
      <Background />
      <Header>
        <Title>{title}</Title>
        <Date>{date}</Date>
        <TagContainer>
          {tags.map((tag, index) => (
            <Tag key={index}># {tag}</Tag>
          ))}
        </TagContainer>
      </Header>
      <Content>{content}</Content>
    </Wrapper>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { id } = context.params as Record<string, string>;

  try {
    const post = await get<PostWithContent>(`/posts/${id}`);

    return {
      props: post,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const Wrapper = styled.div``;

const Background = styled.div`
  position: fixed;
  top: -300px;
  left: -300px;

  width: 600px;
  height: 600px;

  transform: rotate(45deg);

  background-color: lightblue;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100vh;

  > :not(:first-child) {
    margin-top: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
`;

const Date = styled.p`
  text-align: center;
  font-size: 20px;
`;

const TagContainer = styled.div`
  text-align: center;

  > :not(:first-child) {
    margin-left: 10px;
  }
`;

const Tag = styled.span`
  font-size: 17px;
`;

const Content = styled.div`
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
`;
