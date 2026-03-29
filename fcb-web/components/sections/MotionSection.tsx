"use client";

import { useReducedMotion } from "@/lib/motion";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function MotionSection({ children, className, id }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className={className} id={id}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className={className}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
