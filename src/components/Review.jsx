import ReactStars from "react-rating-stars-component";
import { reviewsRef } from "../firebase/Firebase";
import { addDoc, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { where, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Link } from "react-router-dom";


const Review = ({ id, prevRating, userRated, setDetailReRender, detailReRender }) => {
  const buttonRef = useRef();
  const handleKeyUp = (event)=>{
    if(event.key==="Enter"){
        buttonRef.current.click();
    }
  }

  const useAppState = useContext(AppState);
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [thoughtVal, setThoughtVal] = useState("");
  const [reRender, changereRender] = useState(1);

  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  const resetRating = () => {
    changereRender(reRender + 1);
    setRating(0);
  };

  const sendReview = async () => {
    setLoading(true);

    try {
      if (useAppState.login) {
        if (rating === 0 || thoughtVal === "") {
          throw new Error("Share Rating and Review Both");
        }

        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppState.userName,
          rating: rating,
          thought: thoughtVal,
          timestamp: new Date().getTime(),
        });

        const docRef = doc(db, "movies", id);
        await updateDoc(docRef, {
          rating: prevRating + rating,
          userRated: userRated + 1,
        });
        setDetailReRender(detailReRender+1);
        changereRender(reRender+1)
        resetRating();
        setThoughtVal("");


        swal({
          title: "Review Sent",
          icon: "success",
          button: false,
          timer: 3000,
        });
      }

      else{
        window.alert("Please Login First");
        navigate("/login")
      }
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        button: false,
        timer: 6000,
      });
    }


    setLoading(false);
    
    

  };

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setReviewData([])
      
      let quer = query(reviewsRef, where("movieid", "==", id));
      const queryData = await getDocs(quer);

      queryData.forEach((doc) => {
        setReviewData((prev) => [...prev, doc.data()]);
      });

      setReviewLoading(false);
    }
    getData();
  }, [reRender, id]);


  return (
    <div className="mt-4 border-t-2 pt-3 border-gray-50 disable-text-selection">

    <div className="react-stars-div">
    <Link to={""} onClick={(e)=> e.preventDefault()}>
      <ReactStars
        key={reRender}
        edit={true}
        isHalf={true}
        size={28}
        value={rating}
        onChange={(newRat) => setRating(newRat)}
      />
    </Link>
    </div>

      <input
        onKeyUp={handleKeyUp}

        value={thoughtVal}
        onChange={(e) => setThoughtVal(e.target.value)}
        type="text"
        placeholder="Share Your Review... "
        className="w-full mt-2 text-xl p-2 outline-none bg-gray-800 "
      />
      <button
        ref={buttonRef}
        
        onClick={sendReview}
        className="bg-green-600 w-full p-2 text-xl mt-1 flex justify-center"
      >
        {loading ? <TailSpin color="white" height={28} /> : "Share"}
      </button>

      {reviewLoading ? (
        <div className="flex justify-center mt-[-10px]">
          {" "}
          <ThreeDots color="cyan" width={55} />{" "}
        </div>
      ) : (
        <div className="mt-4">
          {reviewData.map((element, index) => {
            return (
              <div
                key={index}
                className="bg-gray-800 p-2 mt-2 border-b-2 border-gray-500"
              >
                <div className="flex">
                  <p className="text-blue-400 ">{element.name}</p>
                  <p className="ml-3 text-xs mt-1">
                    ({new Date(element.timestamp).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',  hour12: true }) })
                  </p>
                </div>

                <ReactStars
                  key={reRender}
                  edit={false}
                  isHalf={true}
                  size={17}
                  value={element.rating}
                />

                <p>{element.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Review;
