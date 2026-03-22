// FeatureCard.jsx
export default function StepCard({ icon, title, description, step }) {
  return (
    <div
      className="bg-surface-container-lowest rounded-sm p-8 flex items-start justify-between w-full max-w-lg shadow-ambient 
                 hover:bg-surface-container-low transition-colors duration-200 border-none group font-sans"
    >
      {/* Left Section: Icon + Text */}
      <div className="flex items-start gap-6">
        <span className={`${icon} text-2xl text-primary mt-1 opacity-80 group-hover:opacity-100 transition-opacity`}></span>
        <div>
          <h3 className="title-md text-on-surface mb-2">
            {title}
          </h3>
          <p className="body-md text-on-surface opacity-80">{description}</p>
        </div>
      </div>

      {/* Step Number */}
      <div className="label-sm text-primary opacity-40 pt-2 transition-opacity group-hover:opacity-100">
        0{step}
      </div>
    </div>
  );
}