import React, { useEffect ,useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios"

const Contact = ({ listing }) => {
  const [landlord, setlandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    console.log(listing.userRef);
    const fetchLandlord = async () => {
      try {
        const res = await axios.get(
          `/api/v1/user/${listing.userRef}`
        );
        console.log(res)
        if (res.status === 200) {
          setlandlord(res.data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing]);

  const onChange = (e)=>{
    setMessage(e.target.value)
  }
  return (
    // you need the contact details of the user to contact them, so we will create an API route
    <div>
      {landlord && (
        <div>
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here"
            className="w-full border-2 border-gray-300 rounded-lg p-3"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
            className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-75 text-center"
          >
            <button className="w-full p-4">Send Message</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
