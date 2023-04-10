import React from "react";
import Header from "./components/Header";
import DiaryForm from "./components/DiaryForm";
import Diaries from "./components/Diaries";

const App = () => {
  return (
    <div className="App">
      <Header />
      <DiaryForm />
      <Diaries />
    </div>
  );
}

export default App;
