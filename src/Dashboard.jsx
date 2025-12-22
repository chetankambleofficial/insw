import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import { HeaderSection } from "./components/HeaderSection/HeaderSection";
import { useNavigate } from "react-router-dom";

import vessel1 from "/public/images/vessel.png";
import vessel2 from "/public/images/vessel2.jpg";
import vessel3 from "/public/images/vessel3.jpg";
import vessel4 from "/public/images/vessel4.jpg";
import vessel5 from "/public/images/vessel5.jpg";
import vessel6 from "/public/images/vessel6.jpg";

import "./Dashboard.css";

const cardData = [
  {
    title: "Anglo Eastern",
    description:
      "Anglo Eastern manages one of the world's largest fleets, ensuring safe and efficient maritime operations globally.",
    image: vessel5,
    section: "ae",
  },
  {
    title: "V.Ships",
    description:
      "VShips provides world-class marine services, ensuring fleet compliance, efficiency, and technical excellence.",
    image: vessel6,
    section: "vships",
  },
  {
    title: "DASM",
    description: "Fleet DASM operational details and analytics.",
    image: vessel3,
    section: "alpha",
  },
  {
    title: "CSM",
    description: "Fleet CSM operational details and analytics.",
    image: vessel4,
    section: "beta",
  },
  {
    title: "AETMS",
    description: "Fleet AETMS operational details and analytics.",
    image: vessel5,
    section: "gamma",
  },
  {
    title: "AESM",
    description: "Fleet AESM operational details and analytics.",
    image: vessel6,
    section: "delta",
  },
  {
    title: "Nakilat",
    description: "Nakilat fleet overview.",
    image: vessel1,
    section: "delta",
  },
  {
    title: "Other",
    description: "Other fleet overview.",
    image: vessel2,
    section: "delta",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* 🔹 ACTIVE CARD INDEX */
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);
  const autoScrollTimer = useRef(null);
  const resumeTimer = useRef(null);

  const handleCardClick = (section, page = "vessel") => {
    setLoading(true);
    setTimeout(() => navigate(`/${section}/${page}`), 1500);
  };

  /* ================= AUTO SCROLL (SMOOTH + FOCUS) ================= */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.children;
    let index = 0;

    const scrollToCard = () => {
      if (!cards.length) return;

      setActiveIndex(index);

      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      index = (index + 1) % cards.length;
    };

    autoScrollTimer.current = setInterval(scrollToCard, 2600);

    const handleUserScroll = () => {
      clearInterval(autoScrollTimer.current);
      clearTimeout(resumeTimer.current);

      resumeTimer.current = setTimeout(() => {
        autoScrollTimer.current = setInterval(scrollToCard, 2600);
      }, 600);
    };

    container.addEventListener("scroll", handleUserScroll);

    return () => {
      clearInterval(autoScrollTimer.current);
      clearTimeout(resumeTimer.current);
      container.removeEventListener("scroll", handleUserScroll);
    };
  }, []);
  /* =============================================================== */

  return (
    <>
      {/* LOADING OVERLAY */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box className="ship-dot" />
            <Box className="ship-dot" />
            <Box className="ship-dot" />
          </Box>

          <Typography
            sx={{
              color: "#fff",
              mt: 3,
              fontFamily: "Fjalla One",
              fontSize: "1.1rem",
            }}
          >
            Loading Vessels...
          </Typography>
        </Box>
      )}

      <HeaderSection />

      <section className="dashboard-section">
        <div className="background-image" />
        <div className="overlay" />

        <div className="dashboard-content">
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "80vh",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {/* LEFT */}
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                px: 4,
                animation: "fadeUp 1s ease forwards",
              }}
            >
              <Typography
                className="animated-underline"
                sx={{
                  color: "white",
                  fontFamily: "Fjalla One",
                  fontSize: 80,
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                WELCOME TO THE
                <br />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    color: "#000",
                    WebkitTextStroke: "0.6px white",
                    padding: "4px 8px",
                    display: "inline-block",
                  }}
                >
                  INTERNATIONAL SEAWAYS
                </span>
                <br />
                PORTAL
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "Space Grotesk",
                  fontSize: "1.4rem",
                  maxWidth: "90%",
                }}
              >
                This dashboard provides an overview of our fleet operations and
                company updates. Explore vessel information, ongoing projects,
                and key metrics across our global fleet.
              </Typography>
            </Box>

            {/* RIGHT */}
            <Box
              ref={scrollRef}
              sx={{
                width: "40%",
                maxHeight: "75vh",
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 4,
                pl: 5,
                pr: 2,
                alignContent: "flex-start",
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "6px",
                },
              }}
            >
              {cardData.map((card, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <Card
                    key={idx}
                    onClick={() => handleCardClick(card.section)}
                    className="card-animate"
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      border: "0.5px solid #5d5d5dff",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                      transform: isActive
                        ? "scale(1.05)"
                        : "scale(0.97)",
                      opacity: isActive ? 1 : 0.65,
                      zIndex: isActive ? 5 : 1,
                      transition: "transform 0.6s ease, opacity 0.6s ease",
                      animation: `cardAppear 0.9s ease forwards`,
                      animationDelay: `${idx * 0.12}s`,
                    }}
                  >
                    <CardMedia component="img" height="225" image={card.image} />
                    <Box className="hover-overlay" />
                    <Typography className="card-title">
                      {card.title}
                    </Typography>
                    <Box className="card-description">
                      {card.description}
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Box>
        </div>
      </section>

      {/* STYLES – UNCHANGED */}
      <style>
        {`
.ship-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
  animation: shipPulse 1.2s infinite ease-in-out;
}
.ship-dot:nth-child(2) { animation-delay: 0.15s; }
.ship-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes shipPulse {
  0% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-10px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.3; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes cardAppear {
  0% { opacity: 0; transform: translateY(30px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.animated-underline { position: relative; }
.animated-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0%;
  height: 3px;
  background: white;
  animation: underlineReveal 1.2s ease forwards;
  animation-delay: 0.8s;
}

@keyframes underlineReveal {
  from { width: 0%; }
  to { width: 100%; }
}

.card-animate {
  clip-path: polygon(
    0% 0%,
    90% 0%,
    98% 50%,
    90% 100%,
    0% 100%,
    6% 50%
  );
}

.card-animate:nth-child(even) {
  clip-path: polygon(
    100% 0%,
    10% 0%,
    2% 50%,
    10% 100%,
    100% 100%,
    94% 50%
  );
}

.card-animate:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.35);
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  transition: 0.4s ease;
}

.card-animate:hover .hover-overlay {
  background: rgba(0,0,0,0.79);
}

.card-title {
  position: absolute;
  top: 10px;
  left: 15px;
  color: white;
  font-size: 1.5rem;
  font-family: Fjalla One;
  z-index: 2;
  transition: 0.4s ease;
}

.card-description {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px 40px;
  background: rgba(26, 32, 35, 0.69);
  color: white;
  font-size: 0.85rem;
  font-family: Space Grotesk;
}

.card-animate:nth-child(even) .card-title {
  left: 50%;
  right: 10%;
  text-align: right;
}

.card-animate:nth-child(even) .card-description {
  padding-left: 100px;
  padding-right: 20px;
  text-align: right;
}

.card-animate:hover .card-title {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2);
}
        `}
      </style>
    </>
  );
};

export default Dashboard;
