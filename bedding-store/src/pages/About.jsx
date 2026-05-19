import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">О бренде OBLAKO</h1>
        <p className="about-subtitle">Где роскошь встречается с комфортом</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-text">
            <h2>Наша философия</h2>
            <p>
              OBLAKO представляет вершину мастерства в производстве постельного белья. Каждое изделие 
              в нашей коллекции тщательно разработано, чтобы превратить вашу спальню в оазис комфорта и элегантности.
            </p>
            <p>
              Мы верим, что качественный сон — это основа полноценной жизни. Именно поэтому мы используем 
              только лучшие материалы со всего мира — египетский хлопок, шелк тутового дерева, органический бамбук 
              и французский лен.
            </p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80" alt="Роскошное постельное белье" />
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80" alt="Премиальные материалы" />
          </div>
          <div className="about-text">
            <h2>Мастерство</h2>
            <p>
              Каждая нить, каждый шов, каждая деталь продумана. Наши мастера привносят десятилетия 
              опыта в создание постельного белья, которое не только выглядит прекрасно, но и дарит невероятные ощущения.
            </p>
            <p>
              От египетского хлопка с плотностью 600 нитей до шелка тутового дерева 22 момми — мы никогда 
              не идем на компромисс в качестве. Каждая коллекция проходит строгое тестирование, чтобы соответствовать 
              нашим высоким стандартам.
            </p>
          </div>
        </section>

        <section className="about-values">
          <h2>Наши ценности</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Качество</h3>
              <p>Только лучшие материалы, этично произведенные надежными поставщиками по всему миру.</p>
            </div>
            <div className="value-card">
              <h3>Экология</h3>
              <p>Экологичные методы производства, которые уважают нашу планету и будущие поколения.</p>
            </div>
            <div className="value-card">
              <h3>Комфорт</h3>
              <p>Разработано для идеального ночного сна, каждую ночь.</p>
            </div>
            <div className="value-card">
              <h3>Элегантность</h3>
              <p>Вневременной дизайн, который возвышает эстетику вашей спальни.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
