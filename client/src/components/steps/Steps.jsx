import "./steps.scss";

function Steps() {
  const steps = [
    { icon: "🔄", title: "Register", desc: "Create your account to begin the process." },
    { icon: "📄", title: "Upload Documents", desc: "Upload your required documents for verification." },
    { icon: "🔍", title: "Verify Property", desc: "Verify the property details through our system." },
    { icon: "🔁", title: "Transaction", desc: "Complete the transaction and secure your property." },
  ];

  return (
    <section className="steps">
      <h2>Get Started in 4 Easy Steps</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <span className="icon">{step.icon}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Steps;
