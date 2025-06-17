import { cloneElement, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

function CSSTransitionWithRef({ children, ...restProps }) {
  const ref = useRef(null);

  const setRef = (value) => {
    ref.current = value;
  };

  return (
    <CSSTransition nodeRef={ref} {...restProps}>
      {cloneElement(children, { ref: setRef })}
    </CSSTransition>
  );
}

export { CSSTransitionWithRef };