import React, { useState } from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import { HeaderSection } from "./components/HeaderSection/HeaderSection";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const cardData = [
  {
    title: "Anglo Eastern",
    description:
      "Anglo Eastern manages one of the world's largest fleets, ensuring safe and efficient maritime operations globally.",
    image: "public/images/ae.png",
    section: "ae",
  },
  {
    title: "VShips",
    description:
      "VShips provides world-class marine services, ensuring fleet compliance, efficiency, and technical excellence.",
    image: "public/images/vships.png",
    section: "vships",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCardClick = (section, page = "vessel") => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/${section}/${page}`);
    }, 1500);
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box className="ship-dot" />
            <Box className="ship-dot" />
            <Box className="ship-dot" />
          </Box>
          <Typography
            sx={{
              color: "white",
              mt: 3,
              fontSize: "1.2rem",
              fontFamily: "Fjalla One",
            }}
          >
            Loading Vessels...
          </Typography>
        </Box>
      )}

      <HeaderSection />

      <section className="dashboard-section">
        <div className="background-image"></div>
        <div className="overlay"></div>

        <div className="dashboard-content">
          <Box
            sx={{
              display: "flex",
              mt: 5,
              justifyContent: "space-around",
              width: "100%",
              height: "80vh",
              fontFamily: "Space Grotesk",
            }}
          >
            {/* LEFT SIDE */}
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 5,
                  fontFamily: "Fjalla One",
                  textAlign: "center",
                  fontSize: 70,
                  position: "relative",
                  lineHeight: 1.2,
                  opacity: 0,
                  transform: "translateY(40px) scale(0.95)",
                  animation: "textAppear 1s ease forwards",
                  animationDelay: "0.2s",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "20%",
                    bottom: -10,
                    width: 0,
                    height: "9px",
                    backgroundColor: "rgba(255, 255, 255, 0.44)",
                    borderRadius: "2px",
                    animation: "underlineGrow 1s ease forwards",
                    animationDelay: "0.8s",
                    maxWidth: "60%",
                  },
                }}
              >
                WELCOME TO THE <br />
                <span
                  style={{
                    color: "#000000ff",
                    WebkitTextStroke: "0.1px #fffbfbff",
                    padding: "10px",
                  }}
                >
                  INTERNATIONAL SEAWAYS
                </span>
                <br /> PORTAL
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  width: "90%",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  textAlign: "center",
                  fontFamily: "Space Grotesk",
                  opacity: 0,
                  transform: "translateY(20px)",
                  animation: "textAppear 1s ease forwards",
                  animationDelay: "0.4s",
                }}
              >
                This dashboard provides an overview of our fleet operations and
                company updates. Explore vessel information, ongoing projects,
                and key metrics across our global fleet.
              </Typography>
            </Box>

            {/* RIGHT SIDE */}
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                pl: 5,
                fontFamily: "Space Grotesk",
              }}
            >
              {cardData.map((card, idx) => (
                <Card
                  key={idx}
                  onClick={() => handleCardClick(card.section)}
                  className="card-animate"
                  sx={{
                    width: "70%",
                    borderRadius: 5,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    border: "0.5px solid #5d5d5dff",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                    transform: "translateY(30px)",
                    opacity: 0,
                    animation: `cardAppear 1s ease forwards`,
                    animationDelay: `${0.5 + idx * 0.2}s`,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="225"
                    image={card.image}
                    sx={{ transition: "0.4s ease" }}
                  />
                  <Box className="hover-overlay" />
                  <Typography className="card-title">{card.title}</Typography>
                  <Box className="card-description">{card.description}</Box>
                </Card>
              ))}
            </Box>
          </Box>
        </div>
      </section>

      <style>
        {`
          @keyframes textAppear {
            0% { opacity: 0; transform: translateY(40px) scale(0.95); }
            60% { opacity: 1; transform: translateY(-10px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes underlineGrow {
            0% { width: 0; }
            100% { width: 100%; }
          }

          @keyframes cardAppear {
            0% { opacity: 0; transform: translateY(40px) scale(0.95); }
            60% { opacity: 1; transform: translateY(-5px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          .card-animate:hover .card-title {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(1.15);
            font-size: 2rem !important;
            letter-spacing: 1px;
          }

          .card-animate:hover .hover-overlay {
            opacity: 1;
          }

          .card-animate:hover img {
            transform: scale(1.07);
          }

          .ship-dot {
            width: 18px;
            height: 18px;
            background-color: #00aaff;
            border-radius: 50%;
            animation: bounce 0.6s infinite alternate;
          }
          .ship-dot:nth-of-type(2) { animation-delay: 0.2s; }
          .ship-dot:nth-of-type(3) { animation-delay: 0.4s; }

          @keyframes bounce {
            0% { transform: translateY(0); opacity: 0.6; }
            100% { transform: translateY(-20px); opacity: 1; }
          }

          .hover-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.6);
            opacity: 0;
            transition: 0.4s ease;
          }

          .card-title {
            position: absolute;
            top: 10px;
            left: 15px;
            z-index: 2;
            color: white;
            font-weight: bold;
            font-size: 1.3rem;
            font-family: Fjalla One;
            transition: 0.45s ease;
          }

          .card-description {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 16px;
            background-color: rgba(26, 32, 35, 0.69);
            color: white;
            font-size: 0.85rem;
            line-height: 1.4;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            font-family: Space Grotesk;
          }
        `}
      </style>
    </>
  );
};

export default Dashboard;
