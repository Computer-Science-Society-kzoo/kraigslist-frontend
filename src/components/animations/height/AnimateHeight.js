
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useMeasure } from "./useMeasure";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled(motion.div)`
  overflow: hidden;
`;

export function AnimateHeight({
  duration,
  ease,
  variants,
  isVisible,
  children,
  ...other
}) {
  const ref = useRef(null);
  const bounds = useMeasure(ref);

  return (
    <Container
      initial={isVisible ? "open" : "collapsed"}
      animate={isVisible ? "open" : "collapsed"}
      inherit={false}
      variants={variants}
      transition={{
        ease,
        duration:
          typeof duration === "number"
            ? duration
            : getAutoHeightDuration(bounds.height) / 1000
      }}
      {...other}
    >
      {typeof children === "function" ? (
        children(ref)
      ) : (
        <div ref={ref}>{children}</div>
      )}
    </Container>
  );
}

/**
 * Get the duration of the animation depending upon
 * the height provided.
 * @param {number} height of container
 */

function getAutoHeightDuration(height) {
  if (!height) return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

AnimateHeight.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  ease: PropTypes.string,
  duration: PropTypes.number,
  className: PropTypes.string,
  variants: PropTypes.shape({
    open: PropTypes.object,
    collapsed: PropTypes.object
  })
};

AnimateHeight.defaultProps = {
  ease: "easeOut",
  variants: {
    open: {
      opacity: 1,
      height: "auto"
    },
    collapsed: { opacity: 0, height: 0 }
  }
};
