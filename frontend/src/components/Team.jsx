// src/components/Team.jsx
import { useState } from 'react';

// Import images directly from src/images/
import ceoImg from '../images/ceo.jpg';
import yasImg from '../images/yas.jpg';
import coryImg from '../images/cory.jpg';
import steveImg from '../images/steve.jpg';
import mhmedImg from '../images/mhmed.jpg';

const teamMembers = [
  {
    name: "Mirindi Jacques Emmanuel",
    role: "Co-Founder & CEO",
    shortBio: "Born in 1994 in the DRC, raised in Bujumbura, Burundi, with a background in digital financial services since 2015...",
    fullBio: [
      "Born in 1994 in the Democratic Republic of Congo, I grew up in Bujumbura, Burundi. Very early on, I developed an interest in technology and digital financial services.",
      "I began my professional career as an Airtel Money agent, then gained experience on several transfer and digital financial service platforms such as Cash App and WorldRemit.",
      "Since 2015, I have been actively involved in the technology field, which has gradually strengthened my vision of digital innovation in Africa.",
      "In 2026, I officially founded Yas Talk, a company co-founded with Mirindi Bahati Yasmine Muchepe, with the aim of developing modern and accessible digital solutions, while also facilitating communication and reducing language barriers through Yas Talk."
    ],
    image: ceoImg,
  },
  {
    name: "Mirindi Bahati Yasmine Muchepe",
    role: "Co-Founder & Communication Administrator",
    shortBio: "Born in 1994 in the DRC, educated at East Africa University in Kampala, with experience spanning UNHCR and La Voix du Peuple...",
    fullBio: [
      "Born in 1994 in the Democratic Republic of Congo, Mirindi Bahati Yasmine Muchepe developed a strong interest in communication, social impact, and organizational development.",
      "She pursued her studies at East Africa University in Kampala, where she gained knowledge and experience that strengthened her understanding of international environments and community engagement.",
      "She began her professional journey by working with the United Nations High Commissioner for Refugees (UNHCR), an organization dedicated to supporting people affected by displacement and humanitarian challenges. This experience allowed her to develop valuable skills in communication, coordination, and working with diverse communities.",
      "Later, she worked independently with a marketing company, La Voix du Peuple, where she contributed to communication and promotional activities, further developing her creativity and understanding of media and public engagement.",
      "In 2026, she joined the Yas Talk project as a co-founder alongside Mirindi Jacques Emmanuel, contributing her experience, vision, and passion for communication to help build a platform focused on digital innovation, global connection, and breaking language barriers through technology."
    ],
    image: yasImg,
  },
  {
    name: "Collins Ogega Mogoi (Cory)",
    role: "Lead Developer",
    shortBio: "Full-stack web and mobile application developer, cybersecurity specialist, and founder of CoryTech...",
    fullBio: [
      "Collins Ogega Mogoi, professionally known as Cory, is a full-stack web and mobile application developer and cybersecurity specialist. He holds formal qualifications in Computer Science and has developed specialized expertise in cybersecurity through rigorous technical training and practical application.",
      "Through his company, CoryTech, he delivers scalable software and secure infrastructure solutions. As the Lead Developer for YasTalk, Cory manages the platform's technical architecture and is currently spearheading its global expansion, ensuring a secure and high-performance communication experience for users worldwide."
    ],
    image: coryImg,
  },
  {
    name: "Stephen Maina",
    role: "Developer & Lead Marketer (Kenya)",
    shortBio: "Versatile Full Stack Web Developer with a strong background in Computer Science, building responsive web apps...",
    fullBio: [
      "Stephen Maina is a versatile Full Stack Web Developer with a strong background in Computer Science. He designs and builds responsive websites and apps that combine sleek visuals with powerful functionality.",
      "With expertise across front-end and back-end technologies, Steve delivers scalable digital solutions that enhance user experience and help businesses thrive online.",
      "He works with Yas Talk as a developer and lead marketer in Kenya."
    ],
    image: steveImg,
  },
  {
    name: "Mhmed Mwangi",
    role: "Community Manager (Kenya)",
    shortBio: "Dedicated community manager with a passion for fostering inclusive and engaging online spaces...",
    fullBio: [
      "Mhmed Mwangi is a dedicated community manager with a passion for fostering inclusive and engaging online spaces. He works to build and maintain strong relationships with users, ensuring their voices are heard and valued.",
      "With a background in communications and social media strategy, Mhmed helps shape the narrative around YasTalk, promoting its mission and values within the communities it serves."
    ],
    image: mhmedImg,
  }
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Meet the Minds Behind <span className="text-gold">YasTalk</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A passionate leadership and development team dedicated to making cross-lingual conversations natural, fast, and accessible worldwide.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300"
          >
            {/* Profile Image */}
            <div className="relative w-28 h-28 mb-5">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full rounded-full object-cover border-4 border-gold/30 shadow-inner"
              />
            </div>

            {/* Name & Role */}
            <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-xs font-semibold text-gold mb-3 uppercase tracking-wider">{member.role}</p>
            
            {/* Short Preview Bio */}
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">{member.shortBio}</p>

            {/* Read Full Bio Button */}
            <button
              onClick={() => setSelectedMember(member)}
              className="text-xs font-semibold text-gold bg-gold/10 hover:bg-gold/20 px-4 py-2 rounded-full transition-colors mt-auto"
            >
              Read Full Biography
            </button>
          </div>
        ))}
      </div>

      {/* Full Biography Modal Popup */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-28 h-28 mb-4">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-gold/40 shadow-md"
                />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">{selectedMember.name}</h3>
              <p className="text-sm font-semibold text-gold uppercase tracking-wider">{selectedMember.role}</p>
            </div>

            {/* Modal Full Paragraphs */}
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-6">
              {selectedMember.fullBio.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}