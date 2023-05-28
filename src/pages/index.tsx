import { compareDesc } from 'date-fns';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { Container } from '../components/Container';
import { Newsletter } from '../components/Newsletter';
import { PageTitle } from '../components/PageTitle';
// import { ThreeElements } from '@react-three/fiber';
// import { Photos } from '../components/Photos';
import { Resume } from '../components/Resume';
import { SocialLink } from '../components/SocialLink';
import { NotePreview } from '../components/notes/NotePreview';
import { About, Name, SocialMedia } from '../data/lifeApi';
import { Note, notesApi } from '../lib/notesApi';

const seoTitle = 'Antioch';
const seoDescription =
  'My life and thoughts on health, leadership, and more. Not structured.';

type Props = {
  latestNotes: Note[];
};

export default function Home({ latestNotes }: Props) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}&description=${seoDescription}`,
            },
          ],
        }}
      />
      <Container className="mt-9">
        <div className="max-w-2xl">
          <PageTitle>{Name}</PageTitle>
          <p className="mt-6 max-w-2xl text-base">{About}</p>
          <div className="mt-6 flex gap-6">
            {SocialMedia.map((socialProfile) => (
              <SocialLink
                key={socialProfile.name}
                aria-label={`Follow on ${socialProfile.name}`}
                href={socialProfile.link}
                icon={socialProfile.icon}
              />
            ))}
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      <ThreeElements/>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {latestNotes.map((blogPost) => (
              <NotePreview key={blogPost.slug} note={blogPost} dense />
            ))}
          </div>
          <div className="lg:ml-auto space-y-10 lg:pl-16 xl:pl-24">
            {false && <Newsletter />}
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}

const NEWEST_POSTS_TO_DISPLAY = 5;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const latestNotes = await notesApi.getNotes('desc', NEWEST_POSTS_TO_DISPLAY);

  return {
    props: { latestNotes },
    revalidate: 10,
  };
};
