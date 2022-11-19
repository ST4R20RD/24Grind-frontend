import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockUsersByIdAPI } from "../../../lib/mockAPI";
import { Card } from "../index";
import nock from "nock";

const MockCard = {
  id: 134634,
  authorId: 1,
  duration: "03h34",
  date: "05/09/2022",
  location: "Quinta da Alagoa",
  category: "Phisical Training",
  attachImage: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000",
  description: "100 💪, 30 Abdominais, 20 Dorsais",
  participants: [],
};

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});

describe("Card Tests on Loading", () => {
  it("should render Spinner on Loading", () => {
    render(<Card {...MockCard} />);
    const divElement = screen.getByTestId("card-spinner");
    expect(divElement).toBeInTheDocument();
  });
});

beforeEach(() => {
  MockUsersByIdAPI(MockCard.authorId);
});

describe("Card Tests", () => {
  it("should not render error message when receive a api user", async () => {
    render(<Card {...MockCard} />);
    const headerElement = screen.queryByTestId("error-section");
    expect(headerElement).not.toBeInTheDocument();
  });

  describe("Attached Image", () => {
    it("should render attached image when there is one", async () => {
      render(<Card {...MockCard} attachImage="http" />);
      const imgElement = await screen.findByAltText("AttachImg");
      expect(imgElement).toBeInTheDocument();
    });

    it("should not render attached image when there isn't one", async () => {
      render(<Card {...MockCard} attachImage="" />);
      const divElement = await screen.findByTestId("success-section");
      await waitFor(() => expect(divElement).toBeInTheDocument());
      const imgElement = screen.queryByAltText("AttachImg");
      expect(imgElement).not.toBeInTheDocument();
    });
  });

  describe("Remainder Indicator", () => {
    it("should render remainder number indicator when participants are more than 5", async () => {
      MockCard.participants.length = 6;
      render(<Card {...MockCard} />);
      const paragraphElement = await screen.findByTestId("participants-crowded");
      expect(paragraphElement).toBeInTheDocument();
    });

    it("should not render remainder number indicator when participants are less than 5", async () => {
      MockCard.participants.length = 4;
      render(<Card {...MockCard} />);
      const divElement = await screen.findByTestId("success-section");
      await waitFor(() => expect(divElement).toBeInTheDocument());
      const paragraphElement = screen.queryByTestId("participants-crowded");
      expect(paragraphElement).not.toBeInTheDocument();
    });
  });
});
