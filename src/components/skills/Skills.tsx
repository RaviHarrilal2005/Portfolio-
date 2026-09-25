import { motion, useReducedMotion } from 'framer-motion';
import Card from '../shared/Card';
import { skillCategories } from '../../data/skills';

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">Technical Skills</p>
        <h2 id="skills-heading" className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Skills & Technologies
        </h2>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
          A practical foundation in software engineering, from writing clean code to shipping accessible interfaces and scalable systems.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <Card className="h-full">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
              <ul className="flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
