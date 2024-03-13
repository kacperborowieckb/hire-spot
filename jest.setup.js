import "@testing-library/jest-dom";
import "whatwg-fetch";

window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
};

const useMutationMock = jest
  .fn()
  .mockReturnValue({ mutate: jest.fn(), isLoading: false });

jest.mock("@clerk/nextjs", () => ({
  auth: () => ({ userId: "mockUserId" }),
  useUser: jest.fn().mockReturnValue({ isSignedIn: false, isLoaded: true }),
  UserButton: () => {
    return <button data-testid="user-button" />;
  },
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
  useParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

//@ts-ignore
window.XMLHttpRequest = jest.fn();

jest.mock("uploadthing/server");

jest.mock("./src/utils/uploadthing", () => ({
  useUploadThing: jest
    .fn()
    .mockReturnValue({ startUpload: jest.fn(), isUploading: false }),
}));

jest.mock("./src/trpc/server", () => {
  return {
    api: {
      recruitment: {
        getAllRecruitmentData: { query: jest.fn() },
        getRecruitmentById: { query: jest.fn() },
        addRecruitment: { mutation: jest.fn() },
      },
      candidate: {
        getCandidateById: { query: jest.fn() },
        addCandidate: { mutation: jest.fn() },
        getCandidatesByRecruitmentId: { query: jest.fn() },
        getUncheckedCandidatesByRecruitmentId: { query: jest.fn() },
        rateCandidate: { mutation: jest.fn() },
        deleteCandidate: { mutation: jest.fn() },
        scheduleCandidate: { mutation: jest.fn() },
        completeInterview: { mutation: jest.fn() },
      },
    },
  };
});

jest.mock("./src/trpc/react", () => {
  return {
    api: {
      useUtils: jest.fn(),
      recruitment: {
        getAllRecruitmentData: { query: jest.fn() },
        getRecruitmentById: { query: jest.fn() },
        addRecruitment: { useMutation: useMutationMock },
      },
      candidate: {
        getCandidateById: { useQuery: jest.fn() },
        addCandidate: { useMutation: useMutationMock },
        getCandidatesByRecruitmentId: { useQuery: jest.fn() },
        getUncheckedCandidatesByRecruitmentId: { query: jest.fn() },
        rateCandidate: { useMutation: useMutationMock },
        deleteCandidate: { useMutation: useMutationMock },
        scheduleCandidate: { useMutation: useMutationMock },
        completeInterview: { useMutation: useMutationMock },
      },
    },
  };
});
