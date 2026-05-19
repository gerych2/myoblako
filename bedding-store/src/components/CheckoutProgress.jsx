import './CheckoutProgress.css'

function CheckoutProgress({ currentStep }) {
  const steps = [
    { id: 1, name: 'Корзина', icon: '🛒' },
    { id: 2, name: 'Оформление', icon: '📝' },
    { id: 3, name: 'Подтверждение', icon: '✓' }
  ]

  return (
    <div className="checkout-progress">
      {steps.map((step, index) => (
        <div key={step.id} className="progress-step-wrapper">
          <div className={`progress-step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
            <div className="progress-step-icon">
              {currentStep > step.id ? '✓' : step.icon}
            </div>
            <div className="progress-step-name">{step.name}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`progress-line ${currentStep > step.id ? 'completed' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default CheckoutProgress
