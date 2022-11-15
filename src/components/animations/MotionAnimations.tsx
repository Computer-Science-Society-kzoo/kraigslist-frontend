import { AnimatePresence, motion } from "framer-motion";

export function AnimatePostItems(props: { children: JSX.Element[], keyName: string }): JSX.Element {

    return (
      <AnimatePresence>
        {props.children.map((child: JSX.Element, index: number) => (
          <motion.div
            key={props.keyName + index}
            initial={{ scale: 1.25, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.1 }}
          >
            {child}
          </motion.div>
        ))}
        
      </AnimatePresence>
        
    )
  }


export function AnimateFilterEntry(props: { children: JSX.Element, keyName: string }): JSX.Element {

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
  )
}
