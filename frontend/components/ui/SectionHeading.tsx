type SectionHeadingProps = {
  title: string;
  description: string;
};

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}