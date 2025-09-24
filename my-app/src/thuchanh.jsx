import React, { useState } from "react";

// ---------------- Bài 1: Todo List ----------------
function TodoApp() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems([...items, { id: Date.now(), text: trimmed }]);
    setText("");
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="p-4 border rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2">Bài 1: To-do List</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập công việc"
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Thêm
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b py-1"
          >
            {item.text}
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- Bài 2: Color Picker ----------------
function ColorBox({ color }) {
  return (
    <div
      className="w-32 h-32 rounded mt-4 mx-auto shadow"
      style={{ backgroundColor: color }}
    ></div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState("");

  return (
    <div className="p-4 border rounded-lg mb-6 text-center">
      <h2 className="text-xl font-bold mb-2">Bài 2: Color Picker</h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setColor("red")}
          className="px-4 py-1 bg-red-500 text-white rounded"
        >
          Đỏ
        </button>
        <button
          onClick={() => setColor("blue")}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Xanh
        </button>
        <button
          onClick={() => setColor("yellow")}
          className="px-4 py-1 bg-yellow-400 rounded"
        >
          Vàng
        </button>
      </div>
      {color && <ColorBox color={color} />}
    </div>
  );
}

// ---------------- Bài 3: Giỏ hàng ----------------
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
    <div className="p-4 border rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2">Bài 3: Giỏ hàng</h2>
      <div>
        <h3 className="font-semibold">Sản phẩm</h3>
        {products.map((p) => (
          <div key={p.id} className="flex justify-between py-1">
            <span>
              {p.name} - {p.price}₫
            </span>
            <button
              onClick={() => addToCart(p)}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Giỏ hàng</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}₫
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">Tổng tiền: {total}₫</p>
      </div>
    </div>
  );
}

// ---------------- Bài 4: Like/Dislike ----------------
function Post({ text }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  return (
    <div className="border p-3 rounded mb-4">
      <p className="mb-2">{text}</p>
      <button
        onClick={() => setLike(like + 1)}
        className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
      >
        👍 {like}
      </button>
      <button
        onClick={() => setDislike(dislike + 1)}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
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
    <div className="p-4 border rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2">Bài 4: Like/Dislike Post</h2>
      {posts.map((p, i) => (
        <Post key={i} text={p} />
      ))}
    </div>
  );
}

// ---------------- Bài 5: Quiz App ----------------
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
  const [answered, setAnswered] = useState([]);

  function handleAnswer(index) {
    if (answered[current] !== undefined) return; // tránh chọn lại
    const correct = index === questions[current].answer;
    if (correct) setScore(score + 1);
    setAnswered({ ...answered, [current]: correct });
  }

  return (
    <div className="p-4 border rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2">Bài 5: Quiz App</h2>
      {current < questions.length ? (
        <div>
          <p className="mb-2">{questions[current].q}</p>
          <div className="flex flex-col gap-2">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="px-3 py-1 border rounded hover:bg-gray-100 text-left"
              >
                {opt}
              </button>
            ))}
          </div>
          {answered[current] !== undefined && (
            <p className="mt-2">
              {answered[current] ? "✅ Đúng rồi!" : "❌ Sai mất rồi!"}
            </p>
          )}
          {answered[current] !== undefined && current < questions.length - 1 && (
            <button
              onClick={() => setCurrent(current + 1)}
              className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Câu tiếp theo
            </button>
          )}
          {answered[current] !== undefined &&
            current === questions.length - 1 && (
              <button
                onClick={() => setCurrent(current + 1)}
                className="mt-3 px-3 py-1 bg-green-500 text-white rounded"
              >
                Xem kết quả
              </button>
            )}
        </div>
      ) : (
        <p className="font-bold">Bạn trả lời đúng {score}/{questions.length} câu</p>
      )}
    </div>
  );
}

// ---------------- App chính ----------------
export default function App() {
  return (
    <div className="max-w-2xl mx-auto my-6 space-y-6">
      <TodoApp />
      <ColorPicker />
      <CartApp />
      <PostApp />
      <QuizApp />
    </div>
  );
}
