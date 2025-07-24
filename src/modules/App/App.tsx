
import Navigations from "../../pages/Navigations"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

import "../../shared/styles/style.css"
import styles from "./App.module.css"

function App() {
  

  return (
    <>
    <div className={styles.appContainer}>
      <div className={styles.headerContainer}>
        <Header />
        <div className={styles.mainContent}>
          <Navigations />
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default App
