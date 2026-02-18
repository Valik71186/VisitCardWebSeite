import { useState, useEffect, useRef } from "react";

const SERVICES = [
    {
        icon: "📄",
        title: "Довіреності",
        items: [
            "Довіреність на купівлю/продаж нерухомості",
            "Довіреність на отримання документів",
            "Довіреність на представництво в судах",
            "Довіреність від імені компанії або ФОП",
            "Довіреність на автомобіль",
            "Генеральна довіреність",
        ],
    },
    {
        icon: "✍️",
        title: "Заяви / Згоди",
        items: [
            "Дозвіл на виїзд дитини за кордон",
            "Згода на продаж/купівлю нерухомості",
            "Дозвіл на постійне місце проживання дитини",
            "Дозвіл на лікування дитини",
            "Заяви для нотаріуса, суду, ТЦК",
        ],
    },
    {
        icon: "⚖️",
        title: "Спадщина",
        items: [
            "Заява про прийняття спадщини",
            "Заява про відмову від спадщини",
            "Заява-згода спадкоємців",
            "Заява про видачу свідоцтва про право на спадщину",
            "Довіреність на оформлення спадщини",
        ],
    },
    {
        icon: "🤝",
        title: "Договори",
        items: [
            "Шлюбний договір",
            "Договір про сплату аліментів",
            "Договір про місце проживання дитини",
            "Договір позики, оренди, позички",
            "Інші договори",
        ],
    },
];

const STEPS = [
    { num: "01", title: "Заявка", desc: "Залиште заявку через сайт або зв'яжіться з нами у месенджері. Відповімо протягом кількох годин." },
    { num: "02", title: "Консультація", desc: "Наші юристи безкоштовно проконсультують і підготують необхідні документи." },
    { num: "03", title: "Підписання", desc: "Потрібен лише паспорт і кілька хвилин — підписуєте онлайн через захищений відеозв'язок." },
    { num: "04", title: "Нотаріус + Апостиль", desc: "Документи проходять нотаріальне посвідчення та апостилювання за Гаазькою конвенцією. Від 24 годин." },
    { num: "05", title: "Доставка", desc: "Готові оригінали з мокрими підписами та печатками доставляємо вам або в Україну." },
];

const CASES = [
    {
        country: "🇬🇧 Велика Британія",
        name: "Олександр",
        task: "Спадщина + продаж частки квартири",
        result: "Оформлено довіреність та заяву про прийняття спадщини. Угода укладена без виїзду до України.",
        days: "7 днів",
    },
    {
        country: "🇩🇪 Німеччина",
        name: "Євген",
        task: "Термінова спадкова справа",
        result: "Від звернення до апостильованих документів — лише 2 дні. Знайшли комплексне рішення.",
        days: "2 дні",
    },
    {
        country: "🇫🇷 Франція",
        name: "Владислав та Володимир",
        task: "Продаж спільної квартири у Львові",
        result: "Виявили помилки в попередній довіреності, оформили нову. Квартира продана успішно.",
        days: "8 днів",
    },
    {
        country: "🇨🇭 Швейцарія",
        name: "Тарас",
        task: "Дарування квартири",
        result: "Довіреність через нотаріуса у Швеції. Право власності зареєстровано в Україні за 19 днів.",
        days: "19 днів",
    },
];

const FAQS = [
    {
        q: "Чи визнаються в Україні документи, оформлені через LegalHelp4UA?",
        a: "Так. Усі документи відповідають нормам Гаазької конвенції 1961 року та Закону України «Про нотаріат» (ст. 98, 100). Відмова у прийнятті таких документів є порушенням закону. За весь час нашої практики відмов не було.",
    },
    {
        q: "Як ви гарантуєте прийняття документів?",
        a: "Якщо через нашу помилку документ не приймуть — виправимо безкоштовно. Якщо виправлення неможливе — повернемо 100% вартості протягом 1 робочого дня.",
    },
    {
        q: "Які документи потрібні для оформлення?",
        a: "Зазвичай достатньо закордонного паспорта. В окремих випадках приймаємо ID-картку, посвідчення водія, посвідку на проживання. Уточнимо на консультації.",
    },
    {
        q: "Скільки коштують послуги?",
        a: "Від $209 для фізичних осіб та від $259 для бізнесу. Ціна включає юридичний супровід, переклад, нотаріальне посвідчення та апостиль. Доставка — окремо.",
    },
    {
        q: "Чи безпечно підписувати документи онлайн?",
        a: "Так. Підписання відбувається відповідно до регламенту ЄС eIDAS. Електронний підпис визнається Україною з грудня 2023 року (Закон №2801-IX).",
    },
];

function useIntersection(ref, options = {}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15, ...options });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return visible;
}

function AnimSection({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const visible = useIntersection(ref);
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);
    const links = ["Послуги", "Процес", "Кейси", "Гарантії", "FAQ"];
    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            background: scrolled ? "rgba(10,20,12,0.97)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(74,222,128,0.12)" : "none",
            transition: "all 0.4s ease",
            padding: "0 2rem",
        }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#22c55e,#16a34a)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚖️</div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#f0fdf4" }}>LegalHelp<span style={{ color: "#4ade80" }}>4UA</span></span>
                </div>
                <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                    {links.map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "#bbf7d0", fontSize: "0.875rem", textDecoration: "none", letterSpacing: "0.05em", fontFamily: "'Raleway', sans-serif", fontWeight: 500, transition: "color 0.2s" }}
                           onMouseEnter={e => e.target.style.color = "#4ade80"}
                           onMouseLeave={e => e.target.style.color = "#bbf7d0"}>
                            {l}
                        </a>
                    ))}
                    <a href="#contact" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: 8, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", fontFamily: "'Raleway', sans-serif", letterSpacing: "0.05em", boxShadow: "0 4px 16px rgba(34,197,94,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }}
                       onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(34,197,94,0.5)"; }}
                       onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 16px rgba(34,197,94,0.35)"; }}>
                        Консультація
                    </a>
                </div>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section style={{
            minHeight: "100vh", display: "flex", alignItems: "center",
            background: "linear-gradient(160deg, #071a0c 0%, #0d2818 40%, #0a1f12 100%)",
            position: "relative", overflow: "hidden", padding: "120px 2rem 80px",
        }}>
            {/* decorative circles */}
            <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "5%", left: "0%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(74,222,128,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                <div style={{ maxWidth: 720 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
                        <span style={{ color: "#86efac", fontSize: "0.8rem", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}>100% ГАРАНТОВАНЕ ПРИЙНЯТТЯ В УКРАЇНІ</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, color: "#f0fdf4", lineHeight: 1.1, marginBottom: 28 }}>
                        Нотаріальні<br />
                        <span style={{ color: "#4ade80" }}>послуги онлайн</span><br />
                        для українців<br />за кордоном
                    </h1>
                    <p style={{ color: "#86efac", fontSize: "1.15rem", lineHeight: 1.75, fontFamily: "'Raleway', sans-serif", marginBottom: 48, maxWidth: 560 }}>
                        Довіреності, заяви, спадщина — дистанційно за 24 години. Без черг, без поїздок. Нотаріус у ЄС + апостиль + доставка.
                    </p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                        <a href="#contact" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", padding: "1rem 2rem", borderRadius: 12, fontSize: "1rem", fontWeight: 700, textDecoration: "none", fontFamily: "'Raleway', sans-serif", letterSpacing: "0.04em", boxShadow: "0 8px 32px rgba(34,197,94,0.4)", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
                           onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(34,197,94,0.55)"; }}
                           onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(34,197,94,0.4)"; }}>
                            Безкоштовна консультація →
                        </a>
                        <a href="#process" style={{ color: "#4ade80", padding: "1rem 1.5rem", borderRadius: 12, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", fontFamily: "'Raleway', sans-serif", border: "1px solid rgba(74,222,128,0.3)", transition: "all 0.2s" }}
                           onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.07)"; }}
                           onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                            Як це працює
                        </a>
                    </div>
                    <div style={{ marginTop: 64, display: "flex", gap: 48, flexWrap: "wrap" }}>
                        {[["3 000+", "клієнтів"], ["120+", "країн світу"], ["24 год", "від підпису до апостилю"], ["100%", "прийнятих документів"]].map(([n, l]) => (
                            <div key={n}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "#4ade80" }}>{n}</div>
                                <div style={{ color: "#6ee7b7", fontSize: "0.8rem", fontFamily: "'Raleway', sans-serif", fontWeight: 500, letterSpacing: "0.04em", marginTop: 2 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Pricing() {
    const PLANS = [
        {
            name: "Фізичні особи",
            price: "від $209",
            tag: "Найпопулярніший",
            items: ["Безкоштовна консультація юриста", "Складання двомовного документа", "Онлайн верифікація та підписання", "Нотаріальне посвідчення в ЄС", "Апостиль за Гаазькою конвенцією", "Доставка оригіналу (окремо)"],
            highlight: true,
        },
        {
            name: "Бізнес / ФОП",
            price: "від $259",
            tag: "Для компаній",
            items: ["Всі послуги пакету Фіз. осіб", "Корпоративні та KYC/AML документи", "Банківські та договірні документи", "Супровід для банків та реєстраторів", "Апостиль у ЄС дистанційно", "Доставка оригіналу (окремо)"],
            highlight: false,
        },
        {
            name: "Документи з України",
            price: "від $...",
            tag: "Під запит",
            items: ["Отримання документів в Україні", "Свідоцтва ДРАЦС, довідки МВС", "Судові рішення, документи МОН", "Апостиль у відповідному органі", "Переклад та засвідчення", "Доставка в будь-яку країну"],
            highlight: false,
        },
    ];
    return (
        <section id="послуги" style={{ padding: "100px 2rem", background: "#071a0c" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <AnimSection>
                    <p style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 12 }}>ТАРИФИ</p>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#f0fdf4", marginBottom: 56 }}>Оберіть свій пакет</h2>
                </AnimSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                    {PLANS.map((p, i) => (
                        <AnimSection key={p.name} delay={i * 120}>
                            <div style={{
                                background: p.highlight ? "linear-gradient(160deg,#0d3320,#0a2218)" : "rgba(255,255,255,0.02)",
                                border: p.highlight ? "1px solid rgba(74,222,128,0.4)" : "1px solid rgba(255,255,255,0.06)",
                                borderRadius: 20, padding: "2rem", position: "relative", overflow: "hidden",
                                boxShadow: p.highlight ? "0 0 60px rgba(34,197,94,0.12), inset 0 1px 0 rgba(74,222,128,0.15)" : "none",
                            }}>
                                {p.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#22c55e,#4ade80,#22c55e)" }} />}
                                <div style={{ display: "inline-block", background: p.highlight ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${p.highlight ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 100, padding: "4px 14px", marginBottom: 20 }}>
                                    <span style={{ color: p.highlight ? "#4ade80" : "#6ee7b7", fontSize: "0.75rem", fontFamily: "'Raleway', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>{p.tag}</span>
                                </div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#f0fdf4", marginBottom: 8 }}>{p.name}</h3>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.25rem", fontWeight: 900, color: "#4ade80", marginBottom: 28 }}>{p.price}</div>
                                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                                    {p.items.map(item => (
                                        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, color: "#d1fae5", fontSize: "0.9rem", fontFamily: "'Raleway', sans-serif", lineHeight: 1.5 }}>
                                            <span style={{ color: "#4ade80", flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#contact" style={{
                                    display: "block", textAlign: "center", padding: "0.875rem",
                                    background: p.highlight ? "linear-gradient(135deg,#22c55e,#16a34a)" : "transparent",
                                    border: p.highlight ? "none" : "1px solid rgba(74,222,128,0.35)",
                                    color: "#fff", borderRadius: 10, fontFamily: "'Raleway', sans-serif",
                                    fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", letterSpacing: "0.04em",
                                    boxShadow: p.highlight ? "0 4px 20px rgba(34,197,94,0.35)" : "none",
                                    transition: "all 0.2s",
                                }}
                                   onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
                                   onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}>
                                    Почати зараз →
                                </a>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Services() {
    const [active, setActive] = useState(0);
    return (
        <section id="послуги-деталі" style={{ padding: "100px 2rem", background: "linear-gradient(180deg,#071a0c,#0a1f12)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <AnimSection>
                    <p style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 12 }}>ДОКУМЕНТИ</p>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#f0fdf4", marginBottom: 16 }}>Що ми оформлюємо</h2>
                    <p style={{ color: "#86efac", fontFamily: "'Raleway', sans-serif", fontSize: "1rem", marginBottom: 56, maxWidth: 520 }}>Повний спектр нотаріальних документів для вирішення ваших питань в Україні — без поїздок.</p>
                </AnimSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                    {SERVICES.map((s, i) => (
                        <AnimSection key={s.title} delay={i * 100}>
                            <div
                                onClick={() => setActive(active === i ? -1 : i)}
                                style={{
                                    background: active === i ? "rgba(34,197,94,0.07)" : "rgba(255,255,255,0.02)",
                                    border: active === i ? "1px solid rgba(74,222,128,0.4)" : "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: 16, padding: "1.75rem", cursor: "pointer", transition: "all 0.3s",
                                    boxShadow: active === i ? "0 0 30px rgba(34,197,94,0.1)" : "none",
                                }}>
                                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{s.icon}</div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#f0fdf4", marginBottom: 16 }}>{s.title}</h3>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: active === i ? "block" : "none" }}>
                                    {s.items.map(item => (
                                        <li key={item} style={{ color: "#bbf7d0", fontSize: "0.85rem", fontFamily: "'Raleway', sans-serif", padding: "5px 0", borderBottom: "1px solid rgba(74,222,128,0.08)", lineHeight: 1.5 }}>
                                            <span style={{ color: "#4ade80", marginRight: 8 }}>→</span>{item}
                                        </li>
                                    ))}
                                </ul>
                                {active !== i && <p style={{ color: "#6ee7b7", fontSize: "0.82rem", fontFamily: "'Raleway', sans-serif" }}>Натисніть, щоб дізнатися більше</p>}
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Process() {
    return (
        <section id="процес" style={{ padding: "100px 2rem", background: "#0a1f12" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <AnimSection>
                    <p style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 12 }}>ЯК ЦЕ ПРАЦЮЄ</p>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#f0fdf4", marginBottom: 64 }}>5 простих кроків</h2>
                </AnimSection>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg,#22c55e,rgba(34,197,94,0.1))", borderRadius: 2 }} />
                    {STEPS.map((s, i) => (
                        <AnimSection key={s.num} delay={i * 100}>
                            <div style={{ display: "flex", gap: 32, marginBottom: 48, position: "relative" }}>
                                <div style={{ width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 24px rgba(34,197,94,0.4)", zIndex: 1 }}>
                                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "0.9rem", color: "#fff" }}>{s.num}</span>
                                </div>
                                <div style={{ paddingTop: 12 }}>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#f0fdf4", marginBottom: 8 }}>{s.title}</h3>
                                    <p style={{ color: "#86efac", fontFamily: "'Raleway', sans-serif", lineHeight: 1.7, fontSize: "0.95rem" }}>{s.desc}</p>
                                </div>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Cases() {
    return (
        <section id="кейси" style={{ padding: "100px 2rem", background: "linear-gradient(180deg,#0a1f12,#071a0c)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <AnimSection>
                    <p style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 12 }}>РЕАЛЬНІ КЕЙСИ</p>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#f0fdf4", marginBottom: 16 }}>Ми вже допомогли<br /><span style={{ color: "#4ade80" }}>понад 3000 українців</span></h2>
                    <p style={{ color: "#86efac", fontFamily: "'Raleway', sans-serif", marginBottom: 56, maxWidth: 480, fontSize: "1rem" }}>Подивіться на реальні результати — без оглядового словника, лише факти.</p>
                </AnimSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                    {CASES.map((c, i) => (
                        <AnimSection key={c.name} delay={i * 100}>
                            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(74,222,128,0.1)", borderRadius: 20, padding: "1.75rem", transition: "all 0.3s" }}
                                 onMouseEnter={e => { e.currentTarget.style.border = "1px solid rgba(74,222,128,0.3)"; e.currentTarget.style.background = "rgba(34,197,94,0.04)"; }}
                                 onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(74,222,128,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                    <span style={{ fontSize: "1.2rem", fontFamily: "'Raleway', sans-serif" }}>{c.country}</span>
                                    <span style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", fontSize: "0.75rem", fontFamily: "'Raleway', sans-serif", fontWeight: 700, padding: "4px 10px", borderRadius: 100, border: "1px solid rgba(74,222,128,0.2)" }}>{c.days}</span>
                                </div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#f0fdf4", marginBottom: 6 }}>{c.name}</h3>
                                <p style={{ color: "#4ade80", fontSize: "0.82rem", fontFamily: "'Raleway', sans-serif", fontWeight: 600, marginBottom: 14, letterSpacing: "0.03em" }}>{c.task}</p>
                                <p style={{ color: "#86efac", fontSize: "0.9rem", fontFamily: "'Raleway', sans-serif", lineHeight: 1.65 }}>{c.result}</p>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Guarantee() {
    return (
        <section id="гарантії" style={{ padding: "100px 2rem", background: "#071a0c" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                    <AnimSection>
                        <p style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 12 }}>ГАРАНТІЇ</p>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, color: "#f0fdf4", lineHeight: 1.2, marginBottom: 24 }}>100% прийнятих документів або <span style={{ color: "#4ade80" }}>повернення грошей</span></h2>
                        <p style={{ color: "#86efac", fontFamily: "'Raleway', sans-serif", lineHeight: 1.75, fontSize: "1rem", marginBottom: 36 }}>
                            Якщо через нашу помилку документ не прийнятий — виправимо безкоштовно. Якщо виправлення неможливе — повернемо 100% вартості протягом 1 робочого дня.
                        </p>
                        <p style={{ color: "#6ee7b7", fontFamily: "'Raleway', sans-serif", lineHeight: 1.75, fontSize: "0.95rem", fontStyle: "italic" }}>
                            «За весь час нашої практики жодного випадку відмови не було. Ми несемо особисту відповідальність за кожен документ.»
                        </p>
                        <p style={{ color: "#4ade80", fontFamily: "'Playfair Display', serif", fontWeight: 700, marginTop: 12 }}>— Тарас Гораль, засновник LegalHelp4UA</p>
                    </AnimSection>
                    <AnimSection delay={150}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {[
                                ["⚖️", "Закон України «Про нотаріат», ст. 98, 100"],
                                ["🌍", "Гаазька конвенція 1961 року — 120+ країн"],
                                ["🔐", "EU eIDAS — визнання електронного підпису"],
                                ["🛡️", "Закон України №2801-IX від 21.11.2022"],
                            ].map(([icon, text]) => (
                                <div key={text} style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
                                    <div style={{ fontSize: "2rem", marginBottom: 10 }}>{icon}</div>
                                    <p style={{ color: "#d1fae5", fontSize: "0.82rem", fontFamily: "'Raleway', sans-serif", lineHeight: 1.55 }}>{text}</p>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const [open, setOpen] = useState(null);
    return (
        <section id="faq" style={{ padding: "100px 2rem", background: "linear-gradient(180deg,#071a0c,#0a1f12)" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <AnimSection>
                    <p style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 12 }}>FAQ</p>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#f0fdf4", marginBottom: 56 }}>Часті запитання</h2>
                </AnimSection>
                {FAQS.map((faq, i) => (
                    <AnimSection key={i} delay={i * 80}>
                        <div style={{ borderBottom: "1px solid rgba(74,222,128,0.1)", marginBottom: 4 }}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                                <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600, fontSize: "1rem", color: "#d1fae5", lineHeight: 1.45 }}>{faq.q}</span>
                                <span style={{ color: "#4ade80", fontSize: "1.4rem", flexShrink: 0, transform: open === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
                            </button>
                            {open === i && (
                                <p style={{ color: "#86efac", fontFamily: "'Raleway', sans-serif", lineHeight: 1.75, fontSize: "0.95rem", paddingBottom: "1.25rem", paddingRight: 40 }}>{faq.a}</p>
                            )}
                        </div>
                    </AnimSection>
                ))}
            </div>
        </section>
    );
}

function Contact() {
    const [form, setForm] = useState({ name: "", phone: "", msg: "" });
    const [sent, setSent] = useState(false);
    const handle = e => { e.preventDefault(); setSent(true); };
    return (
        <section id="contact" style={{ padding: "100px 2rem", background: "#0a1f12" }}>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
                <AnimSection>
                    <p style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: 12, textAlign: "center" }}>ЗВ'ЯЖІТЬСЯ З НАМИ</p>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: "#f0fdf4", marginBottom: 16, textAlign: "center" }}>Безкоштовна консультація</h2>
                    <p style={{ color: "#86efac", fontFamily: "'Raleway', sans-serif", textAlign: "center", marginBottom: 48, lineHeight: 1.7 }}>Залиште заявку — наш юрист зв'яжеться з вами протягом кількох годин.</p>
                    {!sent ? (
                        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {[["Ваше ім'я", "name", "text"], ["Номер телефону / WhatsApp", "phone", "tel"]].map(([ph, name, type]) => (
                                <input key={name} type={type} placeholder={ph} required value={form[name]}
                                       onChange={e => setForm({ ...form, [name]: e.target.value })}
                                       style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 12, padding: "0.9rem 1.25rem", color: "#f0fdf4", fontFamily: "'Raleway', sans-serif", fontSize: "0.95rem", outline: "none", transition: "border 0.2s" }}
                                       onFocus={e => e.target.style.border = "1px solid rgba(74,222,128,0.6)"}
                                       onBlur={e => e.target.style.border = "1px solid rgba(74,222,128,0.2)"} />
                            ))}
                            <textarea placeholder="Опишіть ваше питання (необов'язково)" value={form.msg}
                                      onChange={e => setForm({ ...form, msg: e.target.value })}
                                      rows={4}
                                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 12, padding: "0.9rem 1.25rem", color: "#f0fdf4", fontFamily: "'Raleway', sans-serif", fontSize: "0.95rem", outline: "none", resize: "none", transition: "border 0.2s" }}
                                      onFocus={e => e.target.style.border = "1px solid rgba(74,222,128,0.6)"}
                                      onBlur={e => e.target.style.border = "1px solid rgba(74,222,128,0.2)"} />
                            <button type="submit" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", padding: "1rem", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "'Raleway', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.04em", boxShadow: "0 8px 32px rgba(34,197,94,0.35)", transition: "all 0.2s" }}
                                    onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(34,197,94,0.5)"; }}
                                    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(34,197,94,0.35)"; }}>
                                Отримати консультацію безкоштовно →
                            </button>
                        </form>
                    ) : (
                        <div style={{ textAlign: "center", padding: "3rem", background: "rgba(34,197,94,0.07)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 20 }}>
                            <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#f0fdf4", marginBottom: 12 }}>Заявку отримано!</h3>
                            <p style={{ color: "#86efac", fontFamily: "'Raleway', sans-serif" }}>Наш юрист зв'яжеться з вами найближчим часом.</p>
                        </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 40, flexWrap: "wrap" }}>
                        {[["💬 WhatsApp", "#"], ["✈️ Telegram", "#"], ["📞 Viber", "#"]].map(([label, href]) => (
                            <a key={label} href={href} style={{ color: "#4ade80", fontFamily: "'Raleway', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 100, transition: "all 0.2s" }}
                               onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.08)"; }}
                               onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                                {label}
                            </a>
                        ))}
                    </div>
                </AnimSection>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer style={{ background: "#050f07", borderTop: "1px solid rgba(74,222,128,0.08)", padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#22c55e,#16a34a)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚖️</div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#f0fdf4" }}>LegalHelp<span style={{ color: "#4ade80" }}>4UA</span></span>
                </div>
                <p style={{ color: "#4b7c5e", fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", lineHeight: 1.7 }}>
                    Нотаріальні послуги онлайн для українців за кордоном<br />
                    Пн–Пт 9:00–21:00 (за Києвом) · +49 210 27392063
                </p>
                <p style={{ color: "#2d5240", fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", marginTop: 20 }}>© 2024 LegalHelp4UA. Усі права захищені.</p>
            </div>
        </footer>
    );
}

export default function App() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = "https://fonts.googleapis.com";
        document.head.appendChild(link);
        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Raleway:wght@400;500;600;700&display=swap";
        document.head.appendChild(link2);
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.background = "#071a0c";
    }, []);

    return (
        <div style={{ background: "#071a0c" }}>
            <Navbar />
            <Hero />
            <Pricing />
            <Services />
            <Process />
            <Cases />
            <Guarantee />
            <FAQ />
            <Contact />
            <Footer />
        </div>
    );
}