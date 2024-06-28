import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Consommable from "./Components/Elements/Consommable/Consommable";
import Enemie from "./Components/Elements/Enemie/Enemie";
import Hunter from "./Components/Elements/Hunter/Hunter";
import Loot from "./Components/Elements/Loot/Loot";
import Tools from "./Components/Elements/Tools/Tools";
import SpecialAmmo from "./Components/Elements/SpecialAmmo/SpecialAmmo";
import Trait from "./Components/Elements/Trait/Trait";
import Weapon from "./Components/Elements/Weapon/Weapon";
import EditConsommable from "./Components/Elements/Consommable/CRUD/EditConsommable";
import DeleteConsommable from "./Components/Elements/Consommable/CRUD/DeleteConsommable";
import CreateConsommable from "./Components/Elements/Consommable/CRUD/CreateConsommable";
import ConsommableDetails from "./Components/Elements/Consommable/CRUD/ConsommableDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/consommable" element={<Consommable />} />
          <Route exact path="/consommable/:id" element={<ConsommableDetails/>}/>
          <Route exact path="/consommable/create" element={<CreateConsommable />} />
          <Route exact path="/consommable/edit/:id" element={<EditConsommable />} />
          <Route exact path="/consommable/delete/:id" element={<DeleteConsommable />} />
          
          <Route exact path="/enemie" element={<Enemie/>} />
          <Route exact path="/chasseur" element={<Hunter/>} />
          <Route exact path="/loot" element={<Loot/>} />
          <Route exact path="/outils" element={<Tools/>} />
          <Route exact path="/munitions-speciales" element={<SpecialAmmo/>} />
          <Route exact path="/traits" element={<Trait/>} />
          <Route exact path="/armes" element={<Weapon/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


//TODO: 