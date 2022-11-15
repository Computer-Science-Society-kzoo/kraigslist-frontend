import { AnimatePresence, motion } from "framer-motion";

export function AnimatePostItems(props: {
  children: JSX.Element[];
  keyName: string;
}): JSX.Element {
  return (
    <AnimatePresence exitBeforeEnter>
      {props.children.map((child: JSX.Element, index: number) => (
        <motion.div
          key={props.keyName + index}
          initial={{ scale: 1.25, opacity: 0, y: 0 , filter: "blur(1px)"}}
          animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)"}}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export function AnimatedMessageItem(props: { 
    children: JSX.Element;
    keyName: string;
    index: number;
  }): JSX.Element {
    return (
            <motion.div
                key={props.keyName + props.index}
                initial={{ scale: 1.25, opacity: 0, y: 0 , filter: "blur(1px)"}}
                animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)"}}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.25, delay: props.index * 0.1 }}
            >   
                {props.children}
            </motion.div>
    );
}



//animate enter from the left
export function AnimateConversationsItems(props: {
    children: JSX.Element[];
    keyName: string;
    classToPass: string;
    }): JSX.Element {
    return (
        <AnimatePresence exitBeforeEnter >
          <div className={props.classToPass}>
            {props.children.map((child: JSX.Element, index: number) => (
                <motion.div
                    key={props.keyName + index}
                    initial={{ scale: 1.25, opacity: 0, x: -100, filter: "blur(1px)"}}
                    animate={{ scale: 1, opacity: 1, x: 0, filter: "blur(0px)"}}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.1 }}
                >
                    {child}
                </motion.div>
            ))}
          </div>
        </AnimatePresence>
    );
}

                    

export function AnimateFilterEntry(props: {
  children: JSX.Element;
  keyName: string;
}): JSX.Element {
  return (
    <AnimatePresence>
      <motion.div
        key={props.keyName}
        initial={{ scale: 1, opacity: 0, x: -300 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.25, delay: 0.25 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}

export function AnimateElement(props: {
  children: JSX.Element;
  keyName: string;
}): JSX.Element {
  return (
    <AnimatePresence>
      <motion.div
          key={props.keyName}
          initial={{ scale: 1.25, opacity: 0, y: 0 , filter: "blur(1px)"}}
          animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)"}}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}

//animate text to fade in and move from  top to bottom scale: 1, opacity: 1, y: 0
export function AnimateTitle(props: {
  children: JSX.Element;
  keyName: string;
}): JSX.Element {
  return (
    <AnimatePresence>
      <motion.div
        key={props.keyName}
        initial={{ scale: 1.25, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.25, delay: 0.25 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}
