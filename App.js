import React, { useState } from "react";


const btnStyle = {
  margin: "4px",
  padding: "6px 12px",
  border: "1px solid #333",
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
  fontSize: "14px",
};

const inputStyle = {
  padding: "6px",
  border: "1px solid #333",
  fontSize: "14px",
  marginRight: "8px",
};


function TodoApp() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  function handleAdd() {
    if (!text.trim()) return;
    setItems([...items, { id: Date.now(), text }]);
    setText("");
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h3>Bài 1: To-do List</h3>
      <p>
        Có một input và nút “Thêm”. Khi nhập nội dung và nhấn Thêm, item mới sẽ
        được hiển thị trong danh sách. Mỗi item có nút Xóa để xóa khỏi danh
        sách.
      </p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập công việc"
        style={inputStyle}
      />
      <button style={btnStyle} onClick={handleAdd}>
        Thêm
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button style={btnStyle} onClick={() => handleDelete(item.id)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ColorBox({ color }) {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid black",
        marginTop: "10px",
        backgroundColor: color,
      }}
    ></div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState("");

  return (
    <div>
      <h3>Bài 2: Color Picker</h3>
      <button style={btnStyle} onClick={() => setColor("red")}>
        Đỏ
      </button>
      <button style={btnStyle} onClick={() => setColor("blue")}>
        Xanh
      </button>
      <button style={btnStyle} onClick={() => setColor("yellow")}>
        Vàng
      </button>
      <ColorBox color={color} />
    </div>
  );
}


function CartApp() {
  const products = [
    { id: 1, name: "Sách", price: 10000 },
    { id: 2, name: "Bút", price: 5000 },
    { id: 3, name: "Vở", price: 7000 },
  ];
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <h3>Bài 3: Giỏ hàng</h3>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - {p.price}₫{" "}
          <button style={btnStyle} onClick={() => addToCart(p)}>
            Thêm vào giỏ
          </button>
        </div>
      ))}
      <h4>Giỏ hàng</h4>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}₫
          </li>
        ))}
      </ul>
      <p>
        <b>Tổng tiền:</b> {total}₫
      </p>
    </div>
  );
}

function Post({ text }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  return (
    <div style={{ marginBottom: "10px" }}>
      <p>{text}</p>
      <button style={btnStyle} onClick={() => setLike(like + 1)}>
        👍 {like}
      </button>
      <button style={btnStyle} onClick={() => setDislike(dislike + 1)}>
        👎 {dislike}
      </button>
    </div>
  );
}

function PostApp() {
  const posts = [
    "Học ReactJS có khó không?",
    "Props và State là gì?",
    "Lập trình web có vui không?",
  ];
  return (
    <div>
      <h3>Bài 4: Like/Dislike Post</h3>
      {posts.map((p, i) => (
        <Post key={i} text={p} />
      ))}
    </div>
  );
}


function QuizApp() {
  const questions = [
    {
      q: "ReactJS dùng để làm gì?",
      options: ["Mobile App", "Web UI", "Hệ điều hành", "Cơ sở dữ liệu"],
      answer: 1,
    },
    {
      q: "State trong React là gì?",
      options: ["Dữ liệu động", "Thư viện CSS", "API", "Hook"],
      answer: 0,
    },
    {
      q: "JSX là gì?",
      options: [
        "Một ngôn ngữ lập trình",
        "Cú pháp mở rộng của JavaScript",
        "Framework",
        "Database",
      ],
      answer: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function handleAnswer(index) {
    if (index === questions[current].answer) {
      setScore(score + 1);
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <div>
      <h3>Bài 5: Quiz App</h3>
      {!finished ? (
        <div>
          <p>{questions[current].q}</p>
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              style={{ ...btnStyle, display: "block" }}
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <p>
          Bạn trả lời đúng {score}/{questions.length} câu
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <TodoApp />
      <hr />
      <ColorPicker />
      <hr />
      <CartApp />
      <hr />
      <PostApp />
      <hr />
      <QuizApp />
    </div>
  );
}
