
const SetLike = (userId,postId, datapost) =>{

    const convert_datapost = [...datapost].map(object => {
        const isLikeTmp = object.isLike;
        // Handle list like and status liked
        if(object._id === postId) {

            let arrLike = object.like;
            let arrLikeNotContainCurrentUser = arrLike.filter((item) => {
                return item != userId
            });
            if (arrLikeNotContainCurrentUser.length === arrLike.length) {
                arrLike.push(userId);
            } else {
                arrLike = arrLikeNotContainCurrentUser;
            }

          return {
            
            ...object,
            "isLike": !isLikeTmp,
            "like": arrLike
          }
        }
        else return object;
    });
    return convert_datapost;
}

export { SetLike };