import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function App() {
  const [withClass, setWithClass] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [className, setClassName] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [requestEndpoint, setRequestEndpoint] = useState("");
  const [method, setMethod] = useState();
  const [methodEndpoint, setMethodEndpoint] = useState("");
  const [returnStatus, setReturnStatus] = useState();
  const [mediaType, setMediaType] = useState();
  const [responseJSON, setResponseJSON] = useState();
  const [generated, setGenerated] = useState("");

  const handleGenerate = () => {
    const createMethod = () => {
      if (method === "GET") {
        return "@GetMapping";
      } else if (method === "POST") {
        return "@PostMapping";
      }
    };

    const importMethod = () => {
      if (method === "GET") {
        return "import org.springframework.web.bind.annotation.GetMapping;";
      } else if (method === "POST") {
        return "import org.springframework.web.bind.annotation.PostMapping;";
      }
    };

    console.log(JSON.stringify(responseJSON));
    const responseJSONStringify = JSON.stringify(responseJSON);

    const generatedClass = `
    package ${packageName};

    import org.springframework.http.HttpStatus;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    ${importMethod()}
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("${requestEndpoint}")
    public class ${className} {
        ${createMethod()}("${methodEndpoint}")
        public ResponseEntity<String> ${functionName}() {
            String response = ${responseJSONStringify};
            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(response);
        }
    }`;

    const generatedFunction = `
    ${createMethod()}("${methodEndpoint}")
    public ResponseEntity<String> ${functionName}() {
      String response = ${responseJSONStringify};
      return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(response);
    }`;

    setGenerated(withClass ? generatedClass : generatedFunction);
  };

  return (
    <>
      <h1>Generate Mock Service</h1>
      <div>
        <div>
          <label>With class?</label>
          <input
            type="checkbox"
            name="agreement"
            onChange={(e) => setWithClass(e.target.checked)}
          />
        </div>
        {withClass && (
          <div>
            <label>Package name</label>
            <input onChange={(e) => setPackageName(e.target.value)} />
          </div>
        )}
        {withClass && (
          <div>
            <label htmlFor="class-name">Class name : </label>
            <input
              id="class-name"
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
        )}
        {withClass && (
          <div>
            <label htmlFor="request-endpoint">Request Endpoint : </label>
            <input
              id="request-endpoint"
              onChange={(e) => setRequestEndpoint(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="method">Method : </label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value=""></option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            {/* <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option> */}
          </select>
        </div>
        <div>
          <label htmlFor="function-name">Function name : </label>
          <input
            id="function-name"
            onChange={(e) => setFunctionName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="method-endpoint">Endpoint : </label>
          <input
            id="method-endpoint"
            onChange={(e) => setMethodEndpoint(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="http-status">Return status : </label>
          <select
            value={returnStatus}
            onChange={(e) => setReturnStatus(e.target.value)}
          >
            <option value=""></option>
            <option value="200">200 OK</option>
          </select>
        </div>
        <div>
          <label htmlFor="media-type">Media type : </label>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value=""></option>
            <option value="JSON">JSON</option>
          </select>
        </div> */}
        <div>
          <label htmlFor="response-json">Response (JSON) : </label>
          <textarea
            id="response-json"
            rows={10}
            cols={50}
            onChange={(e) => setResponseJSON(e.target.value)}
          />
        </div>
        <button onClick={handleGenerate}>Generate</button>
        <div>
          <SyntaxHighlighter language="java" style={docco}>
            {generated}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
}

export default App;
