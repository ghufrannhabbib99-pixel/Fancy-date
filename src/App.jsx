import { useState } from "react";
import "./App.css";

const FORM_ENDPOINT = "https://formspree.io/f/maeqpdgw";

const foodOptions = ["بيتزا 🍕", "كص دجاج", "سناكات 🍿", "مفاجأة من إيدي 💗"];
const drinkOptions = ["شاي", "عصير 🍓", "مشروب بارد 🧋", "أي شي تحضريه إلي 💜"];
const gameOptions = ["UNO 🃏", "لودو 🎲", "تلوين 🎨", "أسئلة رومانسية 💌"];
const activityOptions = ["نشوف الغروب 🌅", "نتصور سوه 📸", "نتمشى بالكورنيش 🌊", "قعدة وأحاديث 💕"];

function ChoiceGroup({ title, options, value, onChange, multiple = false }) {
  function toggle(option) {
    if (multiple) {
      onChange(
        value.includes(option)
          ? value.filter((item) => item !== option)
          : [...value, option]
      );
    } else {
      onChange(option);
    }
  }

  return (
    <section className="question">
      <h3>{title}</h3>
      <div className="choices">
        {options.map((option) => {
          const selected = multiple
            ? value.includes(option)
            : value === option;

          return (
            <button
              type="button"
              key={option}
              className={`choice ${selected ? "selected" : ""}`}
              aria-pressed={selected}
              onClick={() => toggle(option)}
            >
              {option}
              {selected && <span> ✓</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState("");
  const [games, setGames] = useState([]);
  const [activities, setActivities] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
const [musicPlaying, setMusicPlaying] =useState(false);
const [letterOpen, setLetterOpen] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();

    if (sending) return;

    setSending(true);
    setError("");

    const formData = new FormData();
    formData.append("subject", "💗 Fancy Date - إجابات محمد");
    formData.append("food", food.join("، ") || "لم يحدد");
    formData.append("drink", drink || "لم يحدد");
    formData.append("games", games.join("، ") || "لم يحدد");
    formData.append("activities", activities.join("، ") || "لم يحدد");
    formData.append("date", date);
    formData.append("time", time);
    formData.append("note", note || "ماكو ملاحظة");
    formData.append("updatedAt", new Date().toLocaleString("en-GB"));

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("تعذر إرسال الإجابات. تأكدي من إعدادات الفورمة وحاولي مرة ثانية.");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err.message ||
          "صار خطأ بالاتصال. تأكدي من الإنترنت وحاولي مرة ثانية 💗"
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="site">
      <div className="floating-heart heart-one">♡</div>
      <div className="floating-heart heart-two">♥️</div>
      <div className="floating-heart heart-three">✧</div>

      <header className="topbar">
        <a className="brand" href="#home">♡ Fancy Date</a>
        <span className="top-note">made with love</span>
      </header>

      <section className="hero" id="home">
        <div className="eyebrow">A LITTLE SURPRISE FOR YOU ✧</div>
        <h1>
          Our little
          <br />
          <span>love story</span>
        </h1>

        <p className="hero-text">
          حبيب روحي وزوجي وقلبي انت كل ذكرى وياك بنيتها
          وراح ابنيها هي شي مميز اليه
          <br />
          💗 بس هسه اجه دوري اسويلك سبرايز واحلي ايامك بيه
        </p>
        {!started && !submitted && (
          <button
            className="primary-button"
            onClick={() => {
              setStarted(true);
              setTimeout(() => {
                document.getElementById("planner")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 100);
            }}
          >
            يلا نبدأ؟ <span>♡</span>
          </button>
        )}
        <div className="music-box">
  <p>🎶 أغنيتنا الخاصة إلك وحدك ❤️</p>

  <button
    type="button"
    className="primary-button music-button"
    onClick={() => setMusicPlaying(!musicPlaying)}
  >
    {musicPlaying ? "إيقاف الأغنية ♡" : "شغّل أغنيتنا يا حبيبي 💗"}
  </button>

  {musicPlaying && (
    <div className="youtube-player">
      <iframe
        width="100%"
        height="200"
        src="https://www.youtube.com/embed/WlJUG-6UsQI?autoplay=1"
        title="Our special song"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  )}
</div>

        <div className="hero-decoration" aria-hidden="true">
          <span>✿</span>
          <span>♡</span>
          <span>✿</span>
        </div>
      </section>
      
      <section className="memories" id="memories">
        <div className="section-kicker">MY FAVORITE PERSON · ♡</div>
        <h2>كل لحظة وياك إلها حكاية</h2>
        <p className="memories-intro">
          محمد، إنت مو بس جزء من قصتي، إنت أحلى جزء بيها 💗
        </p>

        <div className="memory-gallery">
          <figure className="memory-photo main-memory">
            <img
              src="/images/us-main.jpg.jpg"
              alt="My favorite person ♡"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <figcaption>My favorite person ♡</figcaption>
          </figure>

          <figure className="memory-photo memory-tilt-left">
            <img
              src="/images/memory-1.jpg.jpg"
              alt="Our little moments 🌷"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <figcaption>Our little moments 🌷</figcaption>
          </figure>

          <figure className="memory-photo memory-tilt-right">
            <img
              src="/images/memory-2.jpg.jpg"
              alt="Just us 💕"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <figcaption>Just us 💕</figcaption>
          </figure>

          <figure className="memory-photo memory-tilt-left">
            <img
              src="/images/memory-3.jpg.jpg"
              alt="More memories ✨"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <figcaption>More memories ✨</figcaption>
          </figure>
        </div>

        <div className="love-note">
          <span className="love-note-heart">♡</span>
          <p>وكل موعد جديد وياك، أتمنى يصير ذكرى أحبها للأبد.</p>
          <span>— إلك وحدك، بكل الحب 💌</span>
        </div>
      </section>

      {started && !submitted && (
        <section className="planner card" id="planner">
          <div className="section-kicker">JUST FOR US · 01</div>
          <h2>خلينا نخطط لموعدنا 💗</h2>
          <p className="section-description">
            اختار الأشياء اللي تحبها، والباقي خلّيه عليّ.
          </p>

          <form onSubmit={handleSubmit}>
            <ChoiceGroup
              title="🍓 شنو تحب ناكل؟"
              options={foodOptions}
              value={food}
              onChange={setFood}
              multiple
            />

            <ChoiceGroup
              title="🥤 شنو مشروبك المفضل؟"
              options={drinkOptions}
              value={drink}
              onChange={setDrink}
            />

            <ChoiceGroup
              title="🎲 شنو نلعب سوه؟"
              options={gameOptions}
              value={games}
              onChange={setGames}
              multiple
            />

            <ChoiceGroup
              title="🌅 شنو تحب نسوي بالموعد؟"
              options={activityOptions}
              value={activities}
              onChange={setActivities}
              multiple
            />

            <section className="question">
              <h3>📅 أي يوم يناسبك؟</h3>
              <div className="date-fields">
                <label>
                  التاريخ
                  <input
                    type="date"
                    name="datePicker"
                    value={date}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </label>

                <label>
                  الوقت
                  <input
                    type="time"
                    name="timePicker"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                  />
                </label>
              </div>
            </section>

            <section className="question">
              <h3>💌 عندك شي تحب تكلي عليه؟</h3>
              <textarea
                name="noteInput"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="اكتبلي شكد تحبني"
                rows={3}
                maxLength={500}
              />
            </section>

            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}

            <button
              className="primary-button submit-button"
              type="submit"
              disabled={sending}
            >
              {sending ? "دا نرسل إجاباتك... 💌" : "ثبت اختياراتك ♡"}
            </button>
          </form>
        </section>
      )}

      {submitted && (
        <section className="success-card card">
          <div className="success-heart">♡</div>
          <div className="section-kicker">OUR DATE IS IN THE MAKING</div>
          <h2>يا أحلى موعد! 💜</h2>
          <p>
            خلصنه الاختيارات يا حبيب عمري انت
            <br />
            وهسه صار دور السبرايز الحلوة.
          </p>
          <p className="secret-message">
            جهّز نفسك لوقت حلو إلنا إحنا الاثنين 🌷
          </p>

          <button
            className="secondary-button"
            onClick={() => {
              setSubmitted(false);
              setStarted(true);
              setError("");
              setTimeout(() => {
                document.getElementById("planner")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 100);
            }}
          >
            أراجع اختياراتي
          </button>
        </section>
      )}
      {submitted && (
      <section className="secret-letter">
  <div className="section-kicker">A SECRET LETTER FOR YOU ♡</div>

  <h2>عندي شي إلك يا محمدي 💌</h2>
  <p>رسالة صغيرة من قلب غفران إلك وحدك</p>

  {!letterOpen ? (
    <button
      type="button"
      className="letter-envelope"
      onClick={() => setLetterOpen(true)}
    >
      <span className="envelope-icon">💌</span>
      <span>اضغط هنا يا حبيب روحي</span>
      <span className="envelope-kiss">💋</span>
    </button>
  ) : (
    <article className="love-letter">
      <div className="letter-top">إلى زوجي وحبيبي محمدي 🩷</div>

      <p>حبيبي وزوجي وحياتي محمدي🫦💗،</p>

      <p>
        احب اشكرك ع كلشي دتسوي هالفترة مر شهر ع خطوبتنه وانت بعدك بنفس الحماس وبنفس الحب وبنفس الشعور ولا حسستني بيوم انُ هالشي ديتعبك رغم اعرف جاي تتعب🥹🩷،
      </p>

      <p>
        انا وحياتي وعمري وحبي كله نروح فدوة لكل شغله وخطوة تخطيها
      </p>

      <p>
        هالشي الي جاي تسوي هو بداية لحياتنه الجديدة
        <br />
        بداية لحبنه مرة ثانيه
      </p>

      <p>
        ماحبينه عن عبث حبينه لان رب العالمين يدري انت دعوتي بكل صلاتي
      </p>

      <p>
        انا هواي فخورة وشاكرة لكل جهد انت تسوي واتمنى مااقصر وياك مستقبل باي شي تسوي هواي احبك وهواي اريدك هسه وللابد
      </p>

      <div className="letter-signature">
        حبيبتك وزوجتك وصديقتك غفران 🥹💗
        <div className="big-kiss">💋</div>
        <span>إلك وحدك، هسه وللأبد ♡</span>
      </div>
    </article>
  )}
</section>
    )}


      <footer className="footer">
        <span>made with love, just for you</span>
        <span>♡ 2026 ♡</span>
      </footer>
    </main>
  );
}