import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta name="description" content="Browser a huge list of  active React meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://user:QSAe6TGdWrdXec3m@cluster0.hqqzy.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    }
  }

}

export default HomePage;