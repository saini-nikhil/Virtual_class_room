import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";
import { auth } from "../store/firebase";
import { signOut } from "firebase/auth";
import "../style/home.css";
import meet1 from "../img/meet1.jpg";
import meet2 from "../img/meet2.jpg";
import meet3 from "../img/meet3.jpg";
import vc from "../img/v-classroom_logo.png";
export let  userName = ""
const HomePage = () => {
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  
  
  const images = [
    { src: meet1, alt: "Illustration 1" },
    { src: meet2, alt: "Illustration 2" },
    { src: meet3, alt: "Illustration 3" },
  ];

  const paragraphs = [
    {
      heading: "Get a link you can share",
      content: "Click New meeting to get a link you can send to people you want to meet with",
    },
    {
      heading: "Plan ahead",
      content: "Click new meeting to schedule meetings in Google Calendar and send invites to participants",
    },
    {
      heading: "Your meeting is safe",
      content: "No one can join a meeting unless invited or admitted by the host",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const Submitbutton = () => {
    if (!input.trim()) {
      alert("Please enter a valid name.");
      return;
    }
    if (!user) {
      alert("Please login first to join a meeting.");
      navigate("/login");
      return;
    }
    userName = input;
    navigate(`/room/${input}`);
  };
  
  
  return (
    <div>
       <header style={{ 
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div className="logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={vc} alt="Virtual Classroom Logo" style={{ height: "40px" }} />
          <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>Virtual Classroom</span>
        </div>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "20px"
        }}>
          <div className="time" style={{ fontSize: "0.9rem", color: "#666" }}>
            {currentTime.toLocaleTimeString()} &bull; {currentTime.toDateString()}
          </div>

          {user ? (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "15px"
            }}>
              <span style={{ 
                color: "#1a73e8", 
                fontSize: "0.9rem"
              }}>
                {user.email}
              </span>
              <button 
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1a73e8",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#1557b0"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#1a73e8"}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              style={{
                padding: "8px 16px",
                backgroundColor: "#1a73e8",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#1557b0"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#1a73e8"}
            >
              Login
            </button>
          )}
        </div>
      </header>

      <main>
        <div className="content">
          <h1 className="heading">Video calls and meetings for everyone</h1>
          <p>
            Connect, collaborate, and Study from anywhere with Virtual ClassRoom
          </p>

          <div className="buttons">
            <div className="input-box" style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                placeholder="Enter your name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={Submitbutton} style={{ marginBottom: "10px" }}>Join</button>
            </div>
          </div>
        </div>

        <div className="carouselBox">
          <div className="carousel">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={currentIndex === index ? "active" : ""}
              />
            ))}

            <div className="controls">
              <button className="prev" onClick={handlePrev} aria-label="Previous slide">
                &#10094;
              </button>
              <button className="next" onClick={handleNext} aria-label="Next slide">
                &#10095;
              </button>
            </div>
          </div>

          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className={currentIndex === index ? "paragraph activeParagraph" : "paragraph"}
            >
              <p className="p1">{paragraph.heading}</p>
              <p>{paragraph.content}</p>
            </div>
          ))}

          <div className="blue-button-box">
            {images.map((_, index) => (
              <div
                key={index}
                className={`blue-button ${currentIndex === index ? "active-blue-button" : ""}`}
              ></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;