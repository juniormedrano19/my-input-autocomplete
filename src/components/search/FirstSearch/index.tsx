import React, { useState, useRef, useEffect } from 'react';
import styles from '../FirstSearch/first.module.css'
//@ts-ignore
import { Icon } from '@iconify/react';

export const FirstSearch = () => {

    let stuff = [
        "Cookie Monster",
        "Falcon Punch",
        "Lime",
        "Orange cookie plate",
        "Fake your own destiny",
        "I love grass",
        "Grass and fake grass, what do you need?",
        "Feed me booze",
        "Taaaaake oooon meeee (take on me)",
        "Ten little hamburgers",
        "Hamburger helper",
        "Help the hamburger",
        "Orange hamburger mixture",
        "Fake fluff is bad for you",
        "1337, lol elite",
        "Testosterone",
        "Tests are improving",
        "Regarding your test results...",
        "How many cheese do you need",
        "What is the best way to love",
        "Green is the new Blue, get used to it",
        "Five tricks to lose your face",
        "Faces like potatues and hamburgers",
        "Hamburg is a town",
        "Show me your best deals"
    ];


    let formValues = {
        valor: '',
    }

    const [values, setValues] = useState<any>(formValues)
    const { valor } = values;
    console.log(valor);

    let handleInputChange = (e: any) => {
        setValues({
            [e.target.name]: e.target.value
        })
       


    }
    const divRef = useRef<any>(null);
    const divRefResultados = useRef<any>(null);
    const inputText = useRef<any>(null);


    const search = (text: any) => {
        let results = [];
        if (text == "") return [];
        for (var i = 0; i < stuff.length; i++) {
            if (stuff[i]?.toLowerCase().indexOf(text?.toLowerCase()) > -1) {
                results.push(stuff[i]);
            }
        }
        return results;
    }
    /* console.log(search(valor)); */


    const [dataValueState, setDataValueState] = useState(false)
     const [dataSelected, setDataSelected]=useState(false)
    var originalValue = "";

    let resultElements: any = [];
    var selectedResult = -1;

    let showResults = (results: any) => {

        divRefResultados.current.innerHTML = "";

        if (valor === "") {
            setDataValueState(false)
            divRef.current.style.display = "none";
            setDataSelected(false)
        } else {
           
            if (results.length == 0) {
            
                divRef.current.style.display = "block";
                setDataValueState(true)
            } else {

                divRef.current.style.display = "none";
            
                setDataValueState(true)
            }
           

        }

/* prueba */

        for (var i = 0; i < results.length; i++) {
            var r = document.createElement("div");
            r.className = `${styles.result}`;
            var rx = new RegExp("(" + originalValue + ")", "i");
            r.innerHTML = results[i].replace(rx, "");
            /*   r.innerHTML = results[i].replace(rx, "<span>$1</span>"); */

            resultElements.push(r);
            console.log(r);

            divRefResultados.current.appendChild(r);
        }

        console.log(divRefResultados.current)
        let newMap = divRefResultados.current.childNodes
        newMap?.forEach(function (element: any) {
            element.addEventListener('click', (e: any) => {
                console.log(e.target.innerText
                )

                setValues({
                    valor: e.target.innerText
                })

                
                setDataSelected(true)

            })
            
        });

       



    }
    const onReset = () => {
        setValues({valor:''});
      }

  
    let textValue = inputText.current?.value
    let textToString = `${textValue}`;
    let lenghtToText = textToString.length


    useEffect(() => {
        inputText.current?.focus();
    }, [inputText]);

   useEffect(() => {
    if(!dataSelected){
        divRefResultados.current.style.display="block"
    }else{
        divRefResultados.current.style.display="none"
    }
   
   }, [dataSelected])
   

    useEffect(() => {
        showResults(search(valor))
    }, [valor])






    return (
        <div className={styles.containerFirst}>
            <div className={styles.container}>
                <div className={styles.search} id="search">
                    <div className={styles.input_container}>
                        <input ref={inputText} type="text" className={styles.search_input} placeholder="Search" onChange={handleInputChange} value={valor} name="valor" autoComplete='off' />
                        {
                        lenghtToText > 0 && (
                            <span onClick={onReset} className={styles.cleanString}>
                                {/* <Svg icon={Icons.close} /> */}
                                <Icon icon="mingcute:close-fill" />
                            </span>
                        )
                    }
                    </div>

                    <div ref={divRefResultados} className={styles.results} id="results"></div>
                    <div ref={divRef} className={styles.no_results} id="no_results">No results...</div>
                </div>
            </div>


        </div>
    )
}
