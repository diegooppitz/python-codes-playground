import React, { useState, FunctionComponent } from 'react';
import '../styles/AccordionItem.css';

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {isOpen && children}
      </div>
    </div>
  );
};

export default AccordionItem;