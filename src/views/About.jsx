import React, { Component } from 'react'
// import ReactDOM from "react-dom";
import { Row, Col, Card, CardHeader } from 'reactstrap'

import logo from '../assets/img/ktel_logo-blue.png'


class About extends Component {

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render() {
        return (
            <div className="content">
                <Card>
                    <CardHeader className="text-center">
                        <img style={{paddingTop:"30px"}} src={logo} alt="logo"></img>
                    </CardHeader>
                <Row>
                    <Col className="text-center" style={{padding: "30px 15vw", lineHeight: "2rem"}}>
                        <p style={{padding: "30px 0"}}>
                            Το ΚΤΕΛ ΣΥΡΟΥ λειτούργησε για πρώτη φορά το 1946 όταν ιδρύθηκε η ΣΠΑ , ο Σύλλογος Πληγέντων Αυτοκινητιστών (ΦΩΤΟ), ονομασία που αναφέρεται και για πολλά χρόνια μετά ακόμη και την δεκαετία του ’60 παρά την σύσταση του 16ου ΚΤΕΛ ΣΥΡΟΥ το 1950 στην οδό Πρωτοπαπαδάκη και έως το 1968 οπότε μεταφέρθηκαν αφετηρία και γραφεία στην διαπλαντηνθήσα παραλία στην ΑΚΤΗ ΠΕΤΡΟΥ ΡΑΛΛΗ.
                        </p>
                        <p style={{paddingBottom: "30px"}}>
                            Το 1990 μεταφέρθηκε, στη σημερινή θέση στη νέα προβλήτα αφίξεων - αναχωρήσεων των πλοίων, στην ΑΚΤΗ ΠΑΠΑΓΟΥ.
                        </p>    
                        <p style={{paddingBottom: "30px"}}>
                            Όλα αυτά τα χρόνια περισσότερο απο μισό αιώνα βελτίωνε τις υπηρεσίες που πρόσφερε στο επιβατικό κοινό ανανεώνοντας τακτικά τον στόλο των λεωφορείων με πιο σύγχρονα και μεγαλύτερα. Δηλαδή λεωφορεία των 8 και 10 θέσεων σε αυτά των 24,32 και 40 θέσεων και σήμερα με υπερσύγχρονα κλιματιζόμενα λεωφορεία των 50 και πλέον θέσεων. Ταυτόχρονα αυξάνοντας και την συχνότητα των δρομολογίων έφτασε σήμερα να εξυπηρετεί τα χωριά και τις παραλίες της Σύρου ανά 30 λεπτά μέχρι και 24ωρη εξυπηρέτηση στην φουλ θερινή σεζόν.
                        </p>
                        <p style={{paddingBottom: "30px"}}>
                            Από το 2003 είναι από τα πρώτα ΚΤΕΛ στην Ελλάδα που κάνει πράξη τη συνεργασία ΔΗΜΩΝ και ΚΤΕΛ και σε συνεργασία με τον Δήμο Ερμούπολης αναπτύσσει ακόμα περισσότερο την Αστική Συγκοινωνία. Η δε γραμμή Αθλητικό Κέντρο - Λιμάνι - Πλατεία Μιαούλη (Δημαρχείο) - Αγ. Νικόλαος - Δόξα είναι ΔΩΡΕΑΝ για το επιβατικό κοινό.
                        </p>
                        <p style={{paddingBottom: "30px"}}>
                            Επιτελεί δε και μέγιστο κοινωνικό έργο μεταφέροντας ευπαθείς και ειδικές ομάδες πληθυσμού με μισό, μειωμένο εισιτήριο ακόμη και ΔΩΡΕΑΝ.
                        </p>
                        <p style={{paddingBottom: "30px"}}>
                            To ΚΤΕΛ Σύρου έχει 13 σύγχρονα λεωφορεία για την εξυπηρέτηση του κοινού.
                        </p>
                        <p style={{paddingBottom: "30px"}}>
                            Ο σταθμός των λεωφορείων του Κ.Τ.Ε.Λ. ΣΥΡΟΥ Α.Ε. βρίσκεται στο λιμάνι της Ερμούπολης επί της οδού ΑΚΤΗ ΠΑΠΑΓΟΥ στην έξοδο αποβίβασης των επιβατών των πλοίων.
                        </p>
                        <p style={{paddingBottom: "30px"}}>
                            Τα δε γραφεία (σταθμαρχείο, γραφείο κίνησης, λογιστήριο, γραφείο προέδρου), βρίσκεται επί της οδού Κύθνου 7, 20 μέτρα από την αφετηρία. Εισιτήρια εκδίδονται εντός των λεωφορείων ή στο αυτόματο μηχάνημα της αφετηρίας στην Παραλία στο περίπτερο πληροφοριών του Κ.Τ.Ε.Λ.
                        </p>
                    </Col>
                </Row>
                </Card>
            </div>
        );
    }
}

export default About