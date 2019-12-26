import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";

function GetPreviousPage(currentPage) {
  if (currentPage != 0) {
    return (
      <Link to={"/colors/" + (parseInt(currentPage) - 1)}>
        <span style={{ margin: "10px" }}>previous</span>
      </Link>
    );
  }
}

function GetNextPage(currentPage, listLength) {
  if (listLength >= 5) {
    return (
      <Link to={"/colors/" + (parseInt(currentPage) + 1)}>
        <span style={{ margin: "10px" }}>next</span>
      </Link>
    );
  }
}

function ColorList() {
  let match = useRouteMatch();

  GetPreviousPage(match);

  let skipNum = 5 * match.params.page;
  const COLORS_QUERY = gql`query { colors( first: 5 skip: ${skipNum}) { id color_code } }`;

  return (
    <Query query={COLORS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Fetching</div>;
        }
        if (error) return <div>Error</div>;

        const colorsToRender = data.colors;

        return (
          <div>
            {colorsToRender.map(color => (
              <Link to={"/color/" + color.id}>
                <div style={{ display: "inline-block" }}>
                  <div
                    style={{
                      boxShadow: "2px 2px 2px 2px",
                      background: color.color_code,
                      display: "inline-block",
                      margin: "10px",
                      width: "150px",
                      height: "150px",
                      position: "relative"
                    }}
                  >
                    <p
                      style={{
                        background: "white",
                        position: "absolute",
                        bottom: "0",
                        margin: "0",
                        paddingBottom: "10px",
                        textAlign: "center",
                        width: "100%"
                      }}
                    >
                      {color.color_code}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {GetPreviousPage(match.params.page)}
            {GetNextPage(match.params.page, colorsToRender.length)}
          </div>
        );
      }}
    </Query>
  );
}

export default ColorList;
