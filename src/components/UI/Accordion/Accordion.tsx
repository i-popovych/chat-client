import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface AccordionProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const ToggleImage = isOpen ? <FaChevronUp /> : <FaChevronDown />;

  return (
    <div className='accordion'>
      <div className='flex gap-2 items-center  hover:cursor-pointer' onClick={toggleAccordion}>
        <div>{title}</div>
        <div>{ToggleImage}</div>
      </div>
      {isOpen && <div className='accordion-content'>{content}</div>}
    </div>
  );
};

export default Accordion;
