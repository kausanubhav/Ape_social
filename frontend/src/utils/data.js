export const categories = [
    {
        name: 'cars',
        image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'wallpapers',
        image: 'https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'fitness',
        image: 'https://images.pexels.com/photos/963697/pexels-photo-963697.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'websites',
        image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
        name: 'technology',
        image: 'https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'nature',
        image: 'https://images.pexels.com/photos/3408552/pexels-photo-3408552.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'meditation',
        image: 'https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'animals',
        image: 'https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'flowers',
        image: 'https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'dark',
        image: 'https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'coffee',
        image: 'https://images.pexels.com/photos/74512/pexels-photo-74512.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];

//Sanity uses GROQ(Graph-Relational Object Queries)
//* -> pull everything from db and *[0] -> get the first document from db
//* is followed by filter
//[filter] returns true or false
// to order '|' can be used; | is a pipeline
export const userQuery = (userId) => {
    const query = `*[_type=='user' && _id=='${userId}']`;
    return query;
};
export const searchQuery = (searchTerm) => {
    const query = `*[_type=='pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' ] {
        image{
            asset->{url}
        },
        _id,
        destination,
        postedBy->{
       _id,userName,image
        },
        save[]{
            _key,
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`;
    return query;
};

export const feedQuery = `*[_type=='pin'] | order(_createdAt desc){
        image{
            asset->{url}
        },
        _id,
        destination,
        postedBy->{
       _id,userName,image
        },
        save[]{
            _key,
            postedBy->{
                _id,
                userName,
                image
            },
        },
    }`;


    export const pinDetailQuery = (pinId) => {
        const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
        return query;
    };

    export const pinDetailMorePinQuery = (pin) => {
        const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
        return query;
    };

   

    
    export const userCreatedPinsQuery = (userId) => {
        const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
        return query;
    };

    export const userSavedPinsQuery = (userId) => {
        const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
        return query;
    };


